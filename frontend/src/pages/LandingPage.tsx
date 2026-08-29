import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Events from "../sections/Events";
import Projects from "../sections/Projects";

export default function LandingPage() {
  useEffect(() => {
    // Deterministic Scroll-Spy
    const navLinks = document.querySelectorAll('.nav-links a[href^="/#"], .mobile-nav-links a[href^="/#"], .nav-links a[href^="#"], .mobile-nav-links a[href^="#"]');
    const validSections: HTMLElement[] = [];
    
    navLinks.forEach(l => {
      const href = l.getAttribute('href');
      if (!href) return;
      const targetId = href.includes('/#') ? href.split('/#')[1] : href.substring(1);
      const sec = document.getElementById(targetId);
      if (sec && !validSections.includes(sec)) {
        validSections.push(sec);
      }
    });

    function updateActiveSection() {
      const scrollPos = window.scrollY;
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      // Activation point is slightly below the header to allow for exact scroll-margin-top hits
      const activationPoint = scrollPos + headerHeight + 5; 
      
      let currentId = '';
      
      validSections.forEach(sec => {
        if (sec.offsetTop <= activationPoint) {
          currentId = sec.id;
        }
      });
      
      if (currentId) {
        navLinks.forEach(l => {
          const href = l.getAttribute('href');
          if (!href) return;
          const targetId = href.includes('/#') ? href.split('/#')[1] : href.substring(1);
          
          if (targetId === currentId) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    }

    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateActiveSection);
    });
    updateActiveSection();
    
    // Hash scroll on mount since React Router might not do it instantly
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Events />
      <Projects />
    </main>
  );
}
