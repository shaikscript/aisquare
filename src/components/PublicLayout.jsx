import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import PublicNavbar, { CosmicBrandMark } from './PublicNavbar.jsx';
import { WORK_DOMAINS } from './DomainVisuals.jsx';
import { apiRequest } from '../utils/api.js';
import { resolveCompanyMap } from '../utils/mapHelper.js';

export default function PublicLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [publicInfo, setPublicInfo] = useState(null);

  useEffect(() => {
    const loadInfo = () => {
      apiRequest('/api/public/info')
        .then((res) => setPublicInfo(res))
        .catch(() => {});
    };
    loadInfo();
    window.addEventListener('aisquare:company-info-updated', loadInfo);
    return () => window.removeEventListener('aisquare:company-info-updated', loadInfo);
  }, []);

  const resolvedMap = resolveCompanyMap(
    publicInfo?.officeAddress,
    publicInfo?.mapLink,
    publicInfo?.mapLat,
    publicInfo?.mapLng
  );

  return (
    <div className="futuristic-public-shell">
      {/* On '/', PublicNavbar is rendered directly inside the full-screen video hero wrapper per spec */}
      {!isHome && <PublicNavbar />}

      <main style={{ flex: 1 }}>
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>

      <footer className="public-footer">
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 38 }}>
            <div style={{ gridColumn: 'span 1' }}>
              <CosmicBrandMark size={34} />
              <p style={{ marginTop: 14, color: 'var(--text-muted)', fontSize: '0.89rem', lineHeight: 1.65 }}>
                Trained evaluator workforce supporting modern AI evaluation, search quality, data
                annotation, and quality assurance initiatives.
              </p>

              {(resolvedMap || publicInfo?.contactEmail || publicInfo?.contactPhone) && (
                <div style={{ marginTop: 16, display: 'grid', gap: 8, fontSize: '0.84rem' }}>
                  {resolvedMap?.displayAddress && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--text-body)' }}>
                      <MapPin size={15} color="#a855f7" style={{ flexShrink: 0, marginTop: 3 }} />
                      <div>
                        <span style={{ whiteSpace: 'pre-line' }}>{resolvedMap.displayAddress}</span>
                        {resolvedMap.directionsUrl && (
                          <div style={{ marginTop: 3 }}>
                            <a
                              href={resolvedMap.directionsUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', fontWeight: 600 }}
                            >
                              View on Google Maps <ExternalLink size={12} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {!resolvedMap?.displayAddress && resolvedMap?.directionsUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={15} color="#a855f7" style={{ flexShrink: 0 }} />
                      <a
                        href={resolvedMap.directionsUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}
                      >
                        Our Office on Google Maps <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                  {publicInfo?.contactEmail && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-body)' }}>
                      <Mail size={14} color="#a855f7" style={{ flexShrink: 0 }} />
                      <a href={`mailto:${publicInfo.contactEmail}`}>{publicInfo.contactEmail}</a>
                    </div>
                  )}
                  {publicInfo?.contactPhone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-body)' }}>
                      <Phone size={14} color="#a855f7" style={{ flexShrink: 0 }} />
                      <span>{publicInfo.contactPhone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                Evaluation Domains
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8, fontSize: '0.88rem' }}>
                {WORK_DOMAINS.map((d) => (
                  <li key={d.id}>
                    <Link to="/#showcase-our-work" style={{ color: 'var(--text-body)' }}>{d.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                Company
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8, fontSize: '0.89rem' }}>
                <li><Link to="/" style={{ color: 'var(--text-body)' }}>Home</Link></li>
                <li><Link to="/about" style={{ color: 'var(--text-body)' }}>About Us</Link></li>
                <li><Link to="/careers" style={{ color: 'var(--text-body)' }}>Careers</Link></li>
                <li><Link to="/contact" style={{ color: 'var(--text-body)' }}>Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                Legal &amp; Portals
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8, fontSize: '0.89rem' }}>
                <li><Link to="/privacy" style={{ color: 'var(--text-body)' }}>Privacy Policy</Link></li>
                <li><Link to="/terms" style={{ color: 'var(--text-body)' }}>Terms &amp; Conditions</Link></li>
                <li><Link to="/login" style={{ fontWeight: 600 }}>Employee Portal Login &rarr;</Link></li>
                <li><Link to="/admin/login" style={{ fontWeight: 600 }}>Administrator Sign In &rarr;</Link></li>
              </ul>
            </div>
          </div>

          <div
            style={{
              paddingTop: 22,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 12,
              fontSize: '0.83rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>&copy; {new Date().getFullYear()} AI Square IT Solutions. All rights reserved.</span>
            <span>AI Evaluation &bull; Search Quality &bull; Data Annotation &bull; AI QA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
