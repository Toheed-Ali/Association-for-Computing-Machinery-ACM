import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function Navbar({ isMobileMenuOpen, toggleMobileMenu }: NavbarProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header>
      <div className="nav-wrap">
        {isHome ? (
          <a href="#home" className="logo">
            <img src="/ACM_logo.png" alt="ACM logo" />
          </a>
        ) : (
          <Link to="/#home" className="logo">
            <img src="/ACM_logo.png" alt="ACM logo" />
          </Link>
        )}
        <nav className="nav-links" id="navLinks">
          {isHome ? (
            <>
              <a href="#home" className="active" data-target="home">Home</a>
              <a href="#about" data-target="about">About</a>
              <a href="#events">Events</a>
              <a href="#projects">Projects</a>
              <a href="#team">Team</a>
              <a href="#contact">Contact</a>
            </>
          ) : (
            <>
              <Link to="/#home">Home</Link>
              <Link to="/#about">About</Link>
              <Link to="/#events">Events</Link>
              <Link to="/#projects">Projects</Link>
              <Link to="/#team">Team</Link>
              <Link to="/#contact">Contact</Link>
            </>
          )}
        </nav>
        <div className="nav-cta-group">
          <Link to="/auth" className="btn btn-fill nav-cta">Login</Link>
        </div>
        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobileMenu"
          onClick={toggleMobileMenu}
        >
          <svg className="icon-menu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f1b3d" strokeWidth="2.5" style={{ display: isMobileMenuOpen ? 'none' : 'block' }}>
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg className="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f1b3d" strokeWidth="2.5" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
