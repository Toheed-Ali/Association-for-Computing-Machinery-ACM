import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import SocialSidebar from "./SocialSidebar";
import Footer from "./Footer";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function setNavHeight() {
      const header = document.querySelector('header');
      if (header) {
        const h = header.offsetHeight;
        document.documentElement.style.setProperty('--nav-h', h + 'px');
      }
    }
    setNavHeight();
    window.addEventListener('resize', setNavHeight);
    return () => window.removeEventListener('resize', setNavHeight);
  }, []);

  return (
    <>
      <SocialSidebar />
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        closeMenu={() => setIsMobileMenuOpen(false)} 
      />
      <Outlet />
      <Footer />
    </>
  );
}
