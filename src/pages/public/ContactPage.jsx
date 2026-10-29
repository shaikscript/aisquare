import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Shield,
  Sparkles,
  ExternalLink,
  Settings,
} from 'lucide-react';
import { apiRequest } from '../../utils/api.js';
import { resolveCompanyMap } from '../../utils/mapHelper.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { WORK_DOMAINS, DomainEmblem } from '../../components/DomainVisuals.jsx';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || '';
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [companyInfo, setCompanyInfo] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(
    initialTopic ? `Enquiry: ${initialTopic}` : ''
  );
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  // Inline Admin Location Quick-Editor (visible only to authenticated Administrators)
  const [editingLocation, setEditingLocation] = useState(false);
  const [draftAddress, setDraftAddress] = useState('');
  const [draftMapLink, setDraftMapLink] = useState('');
  const [savingLocation, setSavingLocation] = useState(false);
  const [locationNotice, setLocationNotice] = useState('');

  useEffect(() => {
    if (initialTopic) {
      setSubject(`Enquiry: ${initialTopic}`);
    }
  }, [initialTopic]);

  const loadPublicInfo = useCallback(async () => {
    try {
      const data = await apiRequest('/api/public/info');
      setCompanyInfo(data);
      setDraftAddress(data?.officeAddress || '');
      setDraftMapLink(data?.mapLink || '');
    } catch {
      setCompanyInfo(null);
    }
  }, []);

  useEffect(() => {
    loadPublicInfo();
  }, [loadPublicInfo]);

  const hasPublishedContactDetails = Boolean(
    companyInfo?.contactEmail || companyInfo?.contactPhone || companyInfo?.officeAddress
  );

  // Always render the Interactive Map Canvas on /contact (never inventing a fake street address)
  const resolvedMap = resolveCompanyMap(
    companyInfo?.officeAddress,
    companyInfo?.mapLink,
    companyInfo?.mapLat,
    companyInfo?.mapLng,
    { fallbackInteractiveCanvas: true }
  );

  const handleSaveLocationQuick = async (e) => {
    e.preventDefault();
    setSavingLocation(true);
    setLocationNotice('');
    try {
      await apiRequest('/api/admin/company-settings', {
        method: 'PUT',
        body: {
          officeAddress: draftAddress.trim(),
          mapLink: draftMapLink.trim(),
        },
      });
      await loadPublicInfo();
      setEditingLocation(false);
      setLocationNotice('Company office location & interactive map pin updated.');
      window.dispatchEvent(new CustomEvent('aisquare:company-info-updated'));
    } catch (err) {
      setLocationNotice(err.message || 'Unable to save location.');
    } finally {
      setSavingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(null);

    setSubmitting(true);
    try {
      const res = await apiRequest('/api/public/contact', {
        method: 'POST',
        body: {
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        },
      });
      setSuccess(res);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Unable to send your message right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '44px 0 28px' }}>
      <div className="container">
        <div style={{ marginBottom: 28 }}>
          <span className="badge badge-info" style={{ marginBottom: 12 }}>
            <Sparkles size={14} />
            Contact AI Square IT Solutions
          </span>
          <h1 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.45rem)', marginBottom: 10 }}>
            Business &amp; Project Enquiries
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: 720, fontSize: '1.02rem' }}>
            Reach out regarding AI evaluation, search quality, response review, data annotation,
            content evaluation, or AI quality assurance projects.
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          {/* Enquiry Form */}
          <div className="neu-card">
            <h2 style={{ fontSize: '1.3rem', marginBottom: 18 }}>Send an Enquiry</h2>

            {error && (
              <div className="alert alert-error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="status">
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Enquiry Saved (Ref #{success.enquiryId})</strong>
                  <div style={{ marginTop: 4 }}>{success.message}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="cnt-name">Your Name *</label>
                <input
                  id="cnt-name"
                  type="text"
                  className="neu-input"
                  placeholder="Full name or organization representative"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cnt-email">Email Address *</label>
                <input
                  id="cnt-email"
                  type="email"
                  className="neu-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cnt-subject">Subject *</label>
                <input
                  id="cnt-subject"
                  type="text"
                  className="neu-input"
                  placeholder="e.g., Search Quality Evaluation Project"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="cnt-message">Message *</label>
                <textarea
                  id="cnt-message"
                  className="neu-textarea"
                  placeholder="Describe your enquiry, project scope, or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <Send size={16} />
                {submitting ? 'Saving Enquiry...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>

          {/* Visual Showcase + Contact Information Panel */}
          <div style={{ display: 'grid', gap: 20 }}>
            <div className="hero-visual-frame">
              <img
                src="/images/hero-ai-visual.png"
                alt="AI Square IT Solutions evaluation domains visual"
              />
            </div>

            <div className="neu-card-compact">
              <h2 style={{ fontSize: '1.12rem', marginBottom: 12 }}>Quick Topic Selection</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {WORK_DOMAINS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSubject(`Enquiry: ${d.title}`)}
                  >
                    <DomainEmblem id={d.id} size={22} />
                    {d.title}
                  </button>
                ))}
              </div>
            </div>

            {hasPublishedContactDetails && (
              <div className="neu-card-compact">
                <h2 style={{ fontSize: '1.12rem', marginBottom: 12 }}>Direct Contact Details</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {companyInfo.contactEmail && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Mail size={18} color="var(--accent-primary)" />
                      <a href={`mailto:${companyInfo.contactEmail}`}>{companyInfo.contactEmail}</a>
                    </div>
                  )}
                  {companyInfo.contactPhone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Phone size={18} color="var(--accent-primary)" />
                      <span>{companyInfo.contactPhone}</span>
                    </div>
                  )}
                  {companyInfo.officeAddress && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <MapPin size={18} color="var(--accent-primary)" style={{ marginTop: 3 }} />
                      <span style={{ whiteSpace: 'pre-line' }}>{companyInfo.officeAddress}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="neu-panel-inset">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Shield size={18} color="var(--accent-primary)" />
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                  Applying for a Position?
                </strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Submit job or general applications with your resume via our{' '}
                <Link to="/careers">Careers</Link> page.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Company Location & Map Section (Always visible on /contact) */}
        {resolvedMap && (
          <div className="neu-card animate-fade-up" style={{ marginTop: 28 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                marginBottom: 18,
              }}
            >
              <div>
                <span className="badge badge-info" style={{ marginBottom: 8 }}>
                  <MapPin size={13} />
                  Our Location
                </span>
                <h2 style={{ fontSize: '1.35rem', margin: '0 0 6px' }}>
                  AI Square IT Solutions &mdash; Interactive Location Map
                </h2>
                {resolvedMap.displayAddress ? (
                  <p style={{ margin: 0, color: 'var(--text-body)', fontSize: '0.94rem', whiteSpace: 'pre-line' }}>
                    {resolvedMap.displayAddress}
                  </p>
                ) : (
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {isAdmin
                      ? 'Admin Tip: Click "Set Exact Office Pin" to enter your address or paste a Google Maps link — the map pin will zoom straight to your office.'
                      : 'Explore our interactive map below or reach our team directly using the enquiry form above.'}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {isAdmin && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingLocation((v) => !v)}
                  >
                    <Settings size={14} />
                    {editingLocation
                      ? 'Close Pin Editor'
                      : resolvedMap.isConfigured
                      ? 'Edit Office Pin'
                      : 'Set Exact Office Pin'}
                  </button>
                )}

                {resolvedMap.directionsUrl && (
                  <a
                    href={resolvedMap.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-hero-secondary"
                    style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                  >
                    <MapPin size={15} />
                    Open in Google Maps
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {locationNotice && (
              <div className="alert alert-success" role="status" style={{ marginBottom: 16 }}>
                <CheckCircle2 size={18} />
                <span>{locationNotice}</span>
              </div>
            )}

            {/* Admin-Only Inline Quick Pin Editor right on /contact */}
            {isAdmin && editingLocation && (
              <form
                onSubmit={handleSaveLocationQuick}
                className="neu-panel-inset"
                style={{ padding: 16, marginBottom: 18 }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: 10 }}>
                  Configure Public Office Address &amp; Map Pin (Visible Only to Admins)
                </div>
                <div className="grid-2" style={{ gap: 12 }}>
                  <div className="form-group" style={{ marginBottom: 10 }}>
                    <label className="form-label">Confirmed Office Address</label>
                    <input
                      type="text"
                      className="neu-input"
                      placeholder="e.g., Madhapur, HITEC City, Hyderabad, Telangana 500081"
                      value={draftAddress}
                      onChange={(e) => setDraftAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 10 }}>
                    <label className="form-label">Google Maps Link or Coordinates (Optional)</label>
                    <input
                      type="text"
                      className="neu-input"
                      placeholder="Paste Google Maps share URL or lat, lng (e.g. 17.4483, 78.3915)"
                      value={draftMapLink}
                      onChange={(e) => setDraftMapLink(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingLocation(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm" disabled={savingLocation}>
                    {savingLocation ? 'Pinning Location...' : 'Save & Pin on Map'}
                  </button>
                </div>
              </form>
            )}

            {resolvedMap.embedSrc && (
              <div
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow: '0 20px 44px -12px rgba(0, 0, 0, 0.65)',
                }}
              >
                <iframe
                  title="AI Square IT Solutions Office Location Map"
                  src={resolvedMap.embedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 370,
                    border: 'none',
                    background: '#0d051d',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
