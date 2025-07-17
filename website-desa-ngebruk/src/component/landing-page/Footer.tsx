"use client";

import React, { useState, useEffect } from "react";
import { FiInstagram, FiYoutube, FiPhone, FiMail } from "react-icons/fi";
import VisitorCounter from "@/component/common/VisitorCounter";

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className={`bg-[#1B3A6D] text-white pt-6 md:pt-4 smooth-transition ${mounted ? "smooth-reveal" : "animate-on-load"}`}>
      <div className="max-w-7xl mx-auto px-4 mb-6 sm:px-6 lg:px-8">

        <div className={`flex flex-col md:flex-row justify-between items-center md:items-center mb-6 md:mb-4 smooth-transition ${mounted ? "smooth-reveal stagger-1" : "animate-on-load"}`}>

          <div className="mb-4 md:mb-0">
            <img
              src="/logo.png"
              alt="Desa Ngebruk"
              className="w-20 h-20 md:w-16 md:h-16 object-contain mx-auto md:mx-0 smooth-transition hover:scale-110 animate-float"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>


          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
            <a href="#" className="flex items-center justify-center px-3 py-2 md:px-4 border border-white/30 rounded-lg hover:bg-white/10 smooth-transition text-xs md:text-sm hover-lift">
              <FiInstagram size={14} className="mr-2" />
              Instagram
            </a>
            <a href="#" className="flex items-center justify-center px-3 py-2 md:px-4 border border-white/30 rounded-lg hover:bg-white/10 smooth-transition text-xs md:text-sm hover-lift">
              <FiYoutube size={14} className="mr-2" />
              Youtube
            </a>
            <a href="#" className="flex items-center justify-center px-3 py-2 md:px-4 border border-white/30 rounded-lg hover:bg-white/10 smooth-transition text-xs md:text-sm hover-lift">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
              Tiktok
            </a>
          </div>
        </div>


        <div className={`relative mb-6 md:mb-3 smooth-transition ${mounted ? "smooth-reveal stagger-2" : "animate-on-load"}`}>
          <div className="border-t border-white/30"></div>
        </div>


        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-6 md:mb-3 smooth-transition ${mounted ? "smooth-reveal stagger-3" : "animate-on-load"}`}>

          <div className="text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-1 smooth-transition">Desa Ngebruk</h3>
            <p className="text-white/90 mb-3 md:mb-2 text-sm md:text-sm smooth-transition">Kecamatan Sumberpucung</p>
            <p className="text-white/80 leading-relaxed text-xs md:text-xs break-words smooth-transition">
              Jl. Raya No.7, Krajan, Ngebruk, Kec. Sumberpucung,
              <br />
              Kabupaten Malang, Jawa Timur 65165
            </p>
          </div>


          <div className="text-center md:text-left">
            <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-2 smooth-transition">Hubungi Kami</h4>
            <div className="space-y-2 md:space-y-1">
              <div className="flex items-center justify-center md:justify-start hover-lift smooth-transition">
                <FiPhone size={16} className="mr-3 text-white/80 flex-shrink-0" />
                <span className="text-white/90 text-sm md:text-sm">087874690756</span>
              </div>
              <div className="flex items-center justify-center md:justify-start hover-lift smooth-transition">
                <FiMail size={16} className="mr-3 text-white/80 flex-shrink-0" />
                <span className="text-white/90 text-sm md:text-sm break-all">ngebruk@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`text-center pt-3 md:pt-2 pb-4 bg-[#152d55] smooth-transition ${mounted ? "smooth-reveal stagger-4" : "animate-on-load"}`}>
        <p className="text-white text-xs md:text-xs mb-1 mt-2 smooth-transition">Dikembangkan oleh Tim MMD FILKOM 49 Tahun 2025</p>
        <p className="text-white/70 text-xs md:text-xs leading-relaxed px-2 md:px-0 smooth-transition">Program Mahasiswa Membangun Desa, Fakultas Ilmu Komputer, Universitas Brawijaya</p>
      </div>
    </footer>
  );
};

export default Footer;

