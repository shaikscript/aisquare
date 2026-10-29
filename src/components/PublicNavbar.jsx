import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { WORK_DOMAINS } from './DomainVisuals.jsx';

export function CosmicBrandMark({ size = 32 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
      <span
        className="liquid-glass"
        style={{
          width: size,
          height: size,
          borderRadius: 9,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.64} height={size * 0.64} viewBox="0 0 36 36" fill="none">
          <defs>
            <linearGradient id="cosmicBrandGrad" x1="36" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
          </defs>
          <rect x="4" y="4" width="18" height="18" rx="4.5" stroke="url(#cosmicBrandGrad)" strokeWidth="2.5" />
          <rect
            x="14"
            y="14"
            width="18"
            height="18"
            rx="4.5"
            fill="rgba(255,255,255,0.1)"
            stroke="#f3f2f1"
            strokeWidth="2.3"
          />
          <circle cx="18" cy="18" r="3" fill="#fcd34d" />
        </svg>
      </span>
      <span
        style={{
          fontFamily: 'var(--font-headline)',
          fontWeight: 600,
          fontSize: '1.12rem',
          letterSpacing: '-0.025em',
          color: 'hsl(40, 6%, 95%)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        AI Square
        <span
          style={{
            fontSize: '0.66rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            padding: '1px 6px',
            borderRadius: 999,
            background: 'rgba(168, 85, 247, 0.18)',
            border: '1px solid rgba(252, 211, 77, 0.28)',
            color: '#fcd34d',
          }}
        >
          AI²
        </span>
      </span>
    </span>
  );
}

export default function PublicNavbar() {
  const { user } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const closeAll = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header ref={navRef} style={{ width: '100%', position: 'relative', zIndex: 50 }}>
      <div
        style={{
          width: '100%',
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Left: Brand Logo (height 32px) */}
        <Link
          to="/"
          onClick={closeAll}
          aria-label="AI Square IT Solutions Home"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        >
          <CosmicBrandMark size={32} />
        </Link>

        {/* Center: Nav Items with ChevronDown dropdowns */}
        <nav
          className="cosmic-desktop-nav"
          aria-label="Primary navigation"
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          {/* Domains (with ChevronDown) */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="cosmic-nav-item"
              onClick={() => setOpenDropdown((p) => (p === 'domains' ? null : 'domains'))}
              aria-expanded={openDropdown === 'domains'}
            >
              <span>Domains</span>
              <ChevronDown
                size={15}
                style={{
                  opacity: 0.78,
                  transform: openDropdown === 'domains' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.18s ease',
                }}
              />
            </button>

            {openDropdown === 'domains' && (
              <div className="cosmic-dropdown-menu">
                {WORK_DOMAINS.map((d) => (
                  <Link
                    key={d.id}
                    to="/#showcase-our-work"
                    onClick={closeAll}
                    className="cosmic-dropdown-link"
                  >
                    <span>{d.title}</span>
                    <ArrowUpRight size={13} style={{ opacity: 0.55 }} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/about"
            onClick={closeAll}
            className={({ isActive }) => `cosmic-nav-item${isActive ? ' active' : ''}`}
          >
            About Us
          </NavLink>

          <NavLink
            to="/careers"
            onClick={closeAll}
            className={({ isActive }) => `cosmic-nav-item${isActive ? ' active' : ''}`}
          >
            Careers
          </NavLink>

          {/* Resources / Contact (with ChevronDown) */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="cosmic-nav-item"
              onClick={() => setOpenDropdown((p) => (p === 'resources' ? null : 'resources'))}
              aria-expanded={openDropdown === 'resources'}
            >
              <span>Connect</span>
              <ChevronDown
                size={15}
                style={{
                  opacity: 0.78,
                  transform: openDropdown === 'resources' ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.18s ease',
                }}
              />
            </button>

            {openDropdown === 'resources' && (
              <div className="cosmic-dropdown-menu" style={{ minWidth: 220 }}>
                <Link to="/contact" onClick={closeAll} className="cosmic-dropdown-link">
                  <span>Business Enquiries</span>
                  <ArrowUpRight size={13} style={{ opacity: 0.55 }} />
                </Link>
                <Link to="/login" onClick={closeAll} className="cosmic-dropdown-link">
                  <span>Employee Evaluator Portal</span>
                  <ArrowUpRight size={13} style={{ opacity: 0.55 }} />
                </Link>
                <Link to="/admin/login" onClick={closeAll} className="cosmic-dropdown-link">
                  <span>Administrator Sign In</span>
                  <Shield size={13} style={{ opacity: 0.65 }} />
                </Link>
                <Link to="/privacy" onClick={closeAll} className="cosmic-dropdown-link">
                  <span>Privacy Policy</span>
                </Link>
                <Link to="/terms" onClick={closeAll} className="cosmic-dropdown-link">
                  <span>Terms &amp; Conditions</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Liquid-Glass Pill Action */}
        <div className="cosmic-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!user && (
            <Link
              to="/admin/login"
              onClick={closeAll}
              className="cosmic-nav-item"
              style={{ fontSize: '0.84rem', opacity: 0.78 }}
            >
              Admin
            </Link>
          )}
          {user ? (
            <Link
              to={user.role === 'admin' ? '/admin' : '/portal'}
              onClick={closeAll}
              className="btn-hero-secondary"
              style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            >
              {user.role === 'admin' ? 'Open Admin Portal' : 'Open Employee Portal'}
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={closeAll}
              className="btn-hero-secondary"
              style={{ padding: '8px 18px', fontSize: '0.88rem' }}
            >
              Employee Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="btn-hero-secondary cosmic-mobile-toggle"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle navigation menu"
          style={{ display: 'none', padding: '8px 12px' }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Exact 1px Gradient Divider Line Below Navbar (mt-[3px]) */}
      <div
        style={{
          height: 1,
          width: '100%',
          marginTop: 3,
          background:
            'linear-gradient(90deg, transparent 0%, hsla(40, 6%, 95%, 0.2) 50%, transparent 100%)',
        }}
      />

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          style={{
            padding: '16px 24px 22px',
            background: 'rgba(8, 2, 18, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'grid',
            gap: 8,
          }}
        >
          <Link to="/" onClick={closeAll} className="cosmic-dropdown-link">Home</Link>
          <Link to="/#showcase-our-work" onClick={closeAll} className="cosmic-dropdown-link">AI Quality Domains</Link>
          <Link to="/about" onClick={closeAll} className="cosmic-dropdown-link">About Us</Link>
          <Link to="/careers" onClick={closeAll} className="cosmic-dropdown-link">Careers</Link>
          <Link to="/contact" onClick={closeAll} className="cosmic-dropdown-link">Contact Us</Link>
          <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
            <Link
              to={user ? (user.role === 'admin' ? '/admin' : '/portal') : '/login'}
              onClick={closeAll}
              className="btn-hero-secondary"
              style={{ padding: '11px 18px', width: '100%' }}
            >
              {user ? 'Open Portal' : 'Employee Login'}
            </Link>
            {!user && (
              <Link
                to="/admin/login"
                onClick={closeAll}
                className="cosmic-dropdown-link"
                style={{ justifyContent: 'center', opacity: 0.78 }}
              >
                Administrator Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
