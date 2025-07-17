"use client";

import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import PageHeader from "@/component/common/PageHeader";
import ActionButton from "@/component/common/ActionButton";
import SearchAndFilterBar from "@/component/common/SearchAndFilterBar";
import Pagination from "@/component/common/Pagination";
import { LoadingSpinner, ErrorState, EmptyState, DataTableWithStates } from "@/component/common/LoadingStates";
import { useAnnouncementsPagination, useAnnouncementActions } from "@/hooks/useAnnouncements";

const AnnouncementPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [mounted, setMounted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { announcements, loading, error, currentPage, totalPages, totalItems, itemsPerPage, fetchAnnouncementsPaginated, searchAnnouncementsPaginated, goToPage } = useAnnouncementsPagination();

  const { remove, loading: deleteLoading } = useAnnouncementActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      const statusFilterValue = statusFilter === "All Status" ? "all" : (statusFilter.toLowerCase() as "active" | "inactive" | "expired");
      fetchAnnouncementsPaginated(1, 10, statusFilterValue);
    }
  }, [statusFilter, mounted]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        searchAnnouncementsPaginated(searchTerm);
      } else {
        setIsSearching(false);
        if (mounted) {
          const statusFilterValue = statusFilter === "All Status" ? "all" : (statusFilter.toLowerCase() as "active" | "inactive" | "expired");
          fetchAnnouncementsPaginated(1, 10, statusFilterValue);
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, mounted]);

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      const success = await remove(id.toString());
      if (success) {
        if (isSearching) {
          searchAnnouncementsPaginated(searchTerm);
        } else {
          const statusFilterValue = statusFilter === "All Status" ? "all" : (statusFilter.toLowerCase() as "active" | "inactive" | "expired");
          fetchAnnouncementsPaginated(currentPage, 10, statusFilterValue);
        }
      }
    }
  };

  const handleEdit = (id: string | number) => {
    router.push(`/dashboard/announcement/update?id=${id}`);
  };

  const handlePageChange = (page: number) => {
    if (!isSearching) {
      const statusFilterValue = statusFilter === "All Status" ? "all" : (statusFilter.toLowerCase() as "active" | "inactive" | "expired");
      fetchAnnouncementsPaginated(page, 10, statusFilterValue);
    }
    goToPage(page);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, "dd MMM yyyy", { locale: idLocale });
    } catch (error) {
      return "";
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-yellow-100 text-yellow-800",
      expired: "bg-red-100 text-red-800",
    };

    const statusLabels = {
      active: "Aktif",
      inactive: "Belum Aktif",
      expired: "Kedaluwarsa",
    };

    return <span className={`app-button-small font-medium smooth-transition ${statusClasses[status as keyof typeof statusClasses] || "bg-gray-100 text-gray-800"}`}>{statusLabels[status as keyof typeof statusLabels] || status}</span>;
  };

  const statusOptions = [
    { value: "All Status", label: "Semua Status" },
    { value: "active", label: "Aktif" },
    { value: "inactive", label: "Belum Aktif" },
    { value: "expired", label: "Kedaluwarsa" },
  ];

  const columns = [
    {
      key: "title",
      label: "Judul",
      className: "text-xs font-medium text-black",
      render: (value: string, item: any) => (
        <div>
          <div className="max-w-xs truncate">{value}</div>
          <div className="sm:hidden text-gray-500 text-xs mt-1">{formatDate(item.createdAt)}</div>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Tanggal Dibuat",
      className: "whitespace-nowrap text-xs text-gray-600 hidden sm:table-cell",
      render: (value: any) => formatDate(value),
    },
    {
      key: "priority",
      label: "Prioritas",
      className: "whitespace-nowrap text-xs text-gray-600 hidden md:table-cell",
      render: (value: string) => {
        const priorityClasses = {
          normal: "bg-blue-100 text-blue-800",
          penting: "bg-orange-100 text-orange-800",
          urgent: "bg-red-100 text-red-800",
        };

        const priorityLabels = {
          normal: "Normal",
          penting: "Penting",
          urgent: "Urgent",
        };

        return (
          <span className={`app-button-small font-medium smooth-transition ${priorityClasses[value as keyof typeof priorityClasses] || "bg-gray-100 text-gray-800"}`}>{priorityLabels[value as keyof typeof priorityLabels] || value}</span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      className: "whitespace-nowrap hidden sm:table-cell",
      render: (value: string) => getStatusBadge(value),
    },
  ];

  const headerActions = (
    <Link href="/dashboard/announcement/create">
      <ActionButton variant="primary" className="flex items-center gap-2 whitespace-nowrap smooth-transition hover-lift">
        <FiPlus size={14} />
        Tambah Pengumuman
      </ActionButton>
    </Link>
  );

  return (
    <>
      <PageHeader title="Kelola Pengumuman" subtitle="Kelola dan atur pengumuman desa" actions={headerActions} mounted={mounted} />

      <div className={`app-content smooth-transition ${mounted ? "smooth-reveal stagger-1" : "animate-on-load"}`}>
        <div className="bg-white app-card shadow-sm border border-gray-100 hover-lift smooth-transition">
          <SearchAndFilterBar
            title="Pengumuman"
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Cari pengumuman..."
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            statusOptions={statusOptions}
            mounted={mounted}
          />

          <DataTableWithStates
            columns={columns}
            data={announcements}
            editRoute={handleEdit}
            onDelete={handleDelete}
            mounted={mounted}
            loading={loading && announcements.length === 0}
            error={error}
            onRetry={() => {
              if (isSearching) {
                searchAnnouncementsPaginated(searchTerm);
              } else {
                const statusFilterValue = statusFilter === "All Status" ? "all" : (statusFilter.toLowerCase() as "active" | "inactive" | "expired");
                fetchAnnouncementsPaginated(currentPage, 10, statusFilterValue);
              }
            }}
            emptyMessage={searchTerm ? "Tidak ditemukan pengumuman yang sesuai" : "Belum ada pengumuman"}
          />

          {!isSearching && totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} itemsPerPage={itemsPerPage} totalItems={totalItems} loading={loading} />}
        </div>
      </div>
    </>
  );
};

export default AnnouncementPage;
