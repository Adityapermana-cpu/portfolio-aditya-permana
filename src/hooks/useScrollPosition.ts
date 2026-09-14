import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    let lastIsScrolled = false;

    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastIsScrolled) {
        lastIsScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return { isScrolled, scrollToSection };
}
