import React, { useState, useEffect } from 'react';

export default function Header({ activeSection, onToggleMobileMenu }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'section-hero', key: 'hero' },
    { label: 'Advisor', id: 'section-advisor', key: 'advisor' },
    { label: 'Database', id: 'section-database', key: 'database' },
    { label: 'Playbooks', id: 'section-playbooks', key: 'playbooks' },
    { label: 'Prompt Builder', id: 'section-prompt-builder', key: 'prompt-builder' },
    { label: 'Simulator', id: 'section-simulator', key: 'simulator' }
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onToggleMobileMenu) {
      onToggleMobileMenu(false);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    const nextState = !mobileMenuOpen;
    setMobileMenuOpen(nextState);
    if (onToggleMobileMenu) {
      onToggleMobileMenu(nextState);
    }
  };

  return (
    <nav 
      id="main-nav" 
      style={{
        background: scrolled ? 'rgba(10, 14, 26, 0.95)' : 'rgba(10, 14, 26, 0.8)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="nav-container">
        <a href="#section-hero" onClick={(e) => handleNavClick(e, 'section-hero')} className="nav-logo">
          ⚡ AI Advisor
        </a>
        
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <li key={item.key}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button 
          className="nav-mobile-toggle btn-ghost" 
          id="mobile-nav-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <style>{`
        /* Desktop styles overrides for active/hover */
        .nav-link.active {
          color: var(--text-primary) !important;
        }
        .nav-link.active::after {
          transform: scaleX(1) !important;
        }
        
        /* Mobile Hamburger & Menu styles */
        #mobile-nav-toggle {
          display: none;
          font-size: 1.5rem;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          transition: color 0.3s ease;
        }
        #mobile-nav-toggle:hover {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          #mobile-nav-toggle {
            display: block;
          }
          .nav-links {
            display: none;
            flex-direction: column;
            width: 100%;
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(17, 24, 39, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
            padding: 1.5rem 2rem;
            gap: 1.25rem;
            align-items: flex-start;
            animation: navSlideDown 0.3s ease forwards;
            z-index: 999;
          }
          .nav-links.active {
            display: flex;
          }
          .nav-links li {
            width: 100%;
          }
          .nav-link {
            display: block;
            width: 100%;
            padding: 0.5rem 0;
            font-size: 1.05rem;
          }
          .nav-link::after {
            display: none; /* Hide bottom line on mobile */
          }
        }

        @keyframes navSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
