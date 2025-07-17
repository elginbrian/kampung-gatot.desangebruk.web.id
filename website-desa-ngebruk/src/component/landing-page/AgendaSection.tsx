"use client";

import React, { useState, useEffect } from "react";
import { useNationalHolidays } from "@/hooks/useNationalHolidays";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface AgendaItem {
  id: string | number;
  title: string;
  date: string;
  time: string;
  category: string;
  color: string;
  isToday: boolean;
  type: string;
  description?: string;
}

const AgendaSection = () => {
  const [mounted, setMounted] = useState(false);
  const { holidays, loading, error } = useNationalHolidays();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string, daysFromToday: number) => {
    try {
      const date = new Date(dateString);

      if (daysFromToday === 0) {
        return "Hari ini";
      } else if (daysFromToday === 1) {
        return "Besok";
      } else if (daysFromToday === -1) {
        return "Kemarin";
      } else if (daysFromToday > 0 && daysFromToday <= 7) {
        return format(date, "EEEE", { locale: idLocale });
      } else {
        return format(date, "dd MMMM yyyy", { locale: idLocale });
      }
    } catch (error) {
      return dateString;
    }
  };

  const getCategoryColor = (type: string, isToday: boolean) => {
    if (isToday) {
      return "bg-red-600 hover:bg-red-700";
    }

    return "bg-[#1B3A6D] hover:bg-[#152f5a]";
  };

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case "national":
        return "Hari Nasional";
      case "religious":
        return "Hari Keagamaan";
      case "regional":
        return "Hari Regional";
      default:
        return "Agenda";
    }
  };

  const agendaItems: AgendaItem[] = holidays.map(
    (holiday, index): AgendaItem => ({
      id: `holiday-${index}`,
      title: holiday.name,
      date: formatDate(holiday.date, holiday.daysFromToday),
      time: "",
      category: getCategoryLabel(holiday.type),
      color: getCategoryColor(holiday.type, holiday.isToday),
      isToday: holiday.isToday,
      type: holiday.type,
      description: holiday.description,
    })
  );

  return (
    <section className={`py-12 md:py-16 bg-gray-50 smooth-transition ${mounted ? "smooth-reveal" : "animate-on-load"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          <div className={`lg:col-span-2 smooth-transition ${mounted ? "smooth-reveal stagger-1" : "animate-on-load"}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 smooth-transition">Agenda Desa Ngebruk</h2>
            <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed smooth-transition">
              Tetap terhubung dengan berbagai kegiatan dan pengumuman penting di Desa Ngebruk. Lihat jadwal hari ini, besok, maupun agenda yang akan datang informasi, kegiatan dan pengumuman informatif.
            </p>
          </div>


          <div className={`lg:col-span-1 smooth-transition ${mounted ? "smooth-reveal stagger-2" : "animate-on-load"}`}>
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6 smooth-transition">Agenda & Hari Besar</h3>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-gray-200 animate-pulse rounded-lg p-4 h-20" />
                  ))}
                </div>
              ) : error ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm">Tidak dapat memuat hari besar nasional.</p>
                </div>
              ) : agendaItems.length === 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">Tidak ada data hari besar nasional yang tersedia.</p>
                </div>
              ) : null}

              {agendaItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`${item.color} text-white rounded-lg p-4 smooth-transition cursor-pointer hover-lift ${mounted ? "smooth-reveal" : "animate-on-load"} ${item.isToday ? "ring-2 ring-yellow-300 ring-opacity-50" : ""}`}
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider smooth-transition">
                      {item.category}
                      {item.isToday && <span className="ml-2 px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">HARI INI</span>}
                    </span>
                    {item.time && <span className="text-xs smooth-transition">{item.time}</span>}
                  </div>
                  <h4 className="font-semibold mb-1 text-sm line-clamp-2 smooth-transition hover:text-yellow-200">{item.title}</h4>
                  <p className="text-xs text-blue-200 smooth-transition">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;

