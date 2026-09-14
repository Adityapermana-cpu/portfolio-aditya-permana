import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, FileBadge } from 'lucide-react';
import { certificatesData } from '../../data/portfolioData';

export const CertificateSection: React.FC = () => {
  return (
    <section
      id="certificates"
      className="relative w-full bg-[#fefae0] py-20 sm:py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fde047] text-[#1c1917] text-xs font-mono font-black border-2 border-[#1c1917] shadow-[2px_2px_0px_#1c1917] mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>07 // SERTIFIKAT &amp; PENCAPAIAN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1c1917] tracking-tight leading-tight">
            Sertifikat &amp; Pencapaian
          </h2>

          <p className="mt-3 max-w-2xl text-sm sm:text-base font-medium text-[#44403c] leading-relaxed">
            Dokumentasi sertifikat, kompetensi, dan pencapaian yang mendukung
            pengalaman pendidikan, teknologi, administrasi, serta pengembangan
            kemampuan profesional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {certificatesData.map((certificate, index) => (
            <motion.article
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08
              }}
              className="group overflow-hidden rounded-2xl sm:rounded-[28px] bg-[#fffdf5] border-2 border-[#1c1917] shadow-[4px_4px_0px_#1c1917] sm:shadow-[6px_6px_0px_#1c1917] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#1c1917] transition-all"
            >
              <div className="relative aspect-[4/3] bg-[#dcfce7] border-b-2 border-[#1c1917] overflow-hidden">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  loading="lazy"
                  className="w-full h-full object-contain p-3 sm:p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fffdf5]/95 border-2 border-[#1c1917] text-[10px] sm:text-xs font-mono font-black shadow-[2px_2px_0px_#1c1917]">
                  <FileBadge className="w-3.5 h-3.5 text-[#15803d]" />
                  {certificate.year}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-black text-[#1c1917] leading-tight">
                  {certificate.title}
                </h3>

                <p className="mt-1 text-xs sm:text-sm font-bold text-[#15803d]">
                  {certificate.issuer}
                </p>

                <p className="mt-3 text-xs sm:text-sm font-medium text-[#44403c] leading-relaxed">
                  {certificate.description}
                </p>

                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#15803d] text-[#fefae0] border-2 border-[#1c1917] shadow-[2px_2px_0px_#1c1917] text-xs font-black hover:bg-[#166534] transition-all"
                  >
                    Lihat Sertifikat
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};