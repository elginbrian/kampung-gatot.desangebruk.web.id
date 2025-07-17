import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export const LoadingSpinner = ({ size = "md", message, className = "" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-[#1B3A6D] ${sizeClasses[size]} mb-2`}></div>
      {message && <div className="text-gray-600 text-sm">{message}</div>}
    </div>
  );
};

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({ message, onRetry, className = "" }: ErrorStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <div className="text-red-500 text-sm mb-2 text-center">Terjadi kesalahan</div>
      <div className="text-gray-500 text-xs mb-4 text-center max-w-md">{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="bg-[#1B3A6D] text-white px-4 py-2 rounded-lg hover:bg-[#152f5a] transition-colors text-sm">
          Coba Lagi
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ title, description, icon, className = "" }: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <div className="text-gray-500 text-sm mb-2 font-medium">{title}</div>
      <div className="text-gray-400 text-xs text-center max-w-md">{description}</div>
    </div>
  );
};

interface ContentSkeletonProps {
  lines?: number;
  className?: string;
}

export const ContentSkeleton = ({ lines = 3, className = "" }: ContentSkeletonProps) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`bg-gray-200 rounded h-4 mb-3 ${i === lines - 1 ? "w-3/4" : "w-full"}`}></div>
      ))}
    </div>
  );
};

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton = ({ className = "" }: CardSkeletonProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded h-6 w-3/4 mb-3"></div>
      <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
      <div className="bg-gray-200 rounded h-4 w-2/3 mb-4"></div>
      <div className="bg-gray-200 rounded h-3 w-1/3"></div>
    </div>
  );
};

interface NewsCardSkeletonProps {
  className?: string;
}

export const NewsCardSkeleton = ({ className = "" }: NewsCardSkeletonProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse ${className}`}>
      <div className="aspect-video bg-gray-200"></div>
      <div className="p-4 md:p-6">
        <div className="bg-gray-200 rounded h-5 w-full mb-3"></div>
        <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
        <div className="bg-gray-200 rounded h-4 w-3/4 mb-4"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="bg-gray-200 rounded h-3 w-24"></div>
        </div>
      </div>
    </div>
  );
};

interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    className?: string;
    render?: (value: any, item: any) => React.ReactNode;
  }>;
  data: any[];
  editRoute?: string | ((id: string | number) => void);
  onDelete?: (id: string | number) => void;
  mounted?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  emptyMessage?: string;
}

export const DataTableWithStates = ({ columns, data, editRoute, onDelete, mounted = true, loading = false, error = null, onRetry, emptyMessage = "Tidak ada data" }: DataTableProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (data.length === 0) {
    return <EmptyState title="Tidak ada data" description={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ""}`}>
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id || index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ""}`}>
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-1">
                  {editRoute &&
                    (typeof editRoute === "function" ? (
                      <button onClick={() => editRoute(item.id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded smooth-transition hover-lift">
                        <FiEdit size={14} />
                      </button>
                    ) : (
                      <Link href={`${editRoute}?id=${item.id}`}>
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded smooth-transition hover-lift">
                          <FiEdit size={14} />
                        </button>
                      </Link>
                    ))}
                  {onDelete && (
                    <button onClick={() => onDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded smooth-transition hover-lift">
                      <FiTrash2 size={14} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
