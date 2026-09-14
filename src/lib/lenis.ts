/**
 * Helper untuk mengatur scroll ketika modal dibuka.
 *
 * File ini sengaja dibuat tanpa dependency Lenis agar
 * ProjectCaseStudyModal tetap dapat berjalan meskipun
 * project belum menggunakan library Lenis.
 */

let previousBodyOverflow = '';
let previousHtmlOverflow = '';

export const stopLenisScroll = (): void => {
  if (typeof document === 'undefined') return;

  previousBodyOverflow = document.body.style.overflow;
  previousHtmlOverflow = document.documentElement.style.overflow;

  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
};

export const startLenisScroll = (): void => {
  if (typeof document === 'undefined') return;

  document.body.style.overflow = previousBodyOverflow;
  document.documentElement.style.overflow = previousHtmlOverflow;
};

export default {
  stopLenisScroll,
  startLenisScroll
};