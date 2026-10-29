import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { apiRequest } from '../../utils/api.js';
import { WORK_DOMAINS, DomainEmblem } from '../../components/DomainVisuals.jsx';

export default function AboutPage() {
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    apiRequest('/api/public/info')
      .then((data) => setCompanyInfo(data))
      .catch(() => setCompanyInfo(null));
  }, []);

  return (
    <div style={{ padding: '40px 0 28px' }}>
      <div className="container">
        {/* Visual Split Hero */}
        <div className="hero-stage" style={{ marginBottom: 34 }}>
          <div className="hero-glow-orb-1" />
          <div className="grid-2" style={{ alignItems: 'center', gap: 36, position: 'relative', zIndex: 2 }}>
            <div className="animate-fade-up">
              <span className="badge badge-info" style={{ marginBottom: 14 }}>
                <Sparkles size={14} />
                About AI Square IT Solutions
              </span>
              <h1 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.65rem)', marginBottom: 16 }}>
                A Trained Human Workforce Built for AI Quality
              </h1>
              <p style={{ fontSize: '1.04rem', color: 'var(--text-body)', marginBottom: 14 }}>
                AI Square IT Solutions employs and prepares dedicated evaluators who work on client
                AI evaluation projects across AI evaluation, search quality evaluation, AI response
                evaluation, data annotation, content evaluation, and AI quality assurance.
              </p>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', margin: 0 }}>
                Our platform combines centralized guideline preparation, structured internal
                assessments, and per-project readiness management so evaluators approach every task
                with clarity and consistency.
              </p>
            </div>

            <div className="hero-visual-frame animate-float">
              <img
                src="/images/about-workforce.png"
                alt="AI Square IT Solutions human-in-the-loop evaluation workforce"
              />
            </div>
          </div>
        </div>

        {/* 6 Specializations Strip */}
        <div className="neu-card" style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: 18 }}>Core Domains We Support</h2>
          <div className="grid-3" style={{ gap: 16 }}>
            {WORK_DOMAINS.map((d) => (
              <div
                key={d.id}
                className="neu-panel-inset"
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}
              >
                <DomainEmblem id={d.id} size={42} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {d.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workforce & Quality Cards */}
        <div className="grid-2" style={{ marginBottom: 30 }}>
          <div className="neu-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Users size={24} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Managed Employee Evaluators</h2>
            </div>
            <p style={{ color: 'var(--text-body)', margin: 0 }}>
              Evaluators work inside an authenticated internal portal with access to reference
              guidelines, structured practice scenarios, and project-specific readiness tracking
              managed directly by authorized administrators.
            </p>
          </div>

          <div className="neu-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <ShieldCheck size={24} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Consistent Guideline Adherence</h2>
            </div>
            <p style={{ color: 'var(--text-body)', margin: 0 }}>
              Objective AI evaluation relies on disciplined adherence to project rubrics rather than
              personal guesswork. Practical judgment scenarios undergo manual review before internal
              results and project readiness approvals are finalized.
            </p>
          </div>
        </div>

        {/* Mission & Vision — Displayed ONLY when supplied by management */}
        {(companyInfo?.mission || companyInfo?.vision) && (
          <div className="grid-2" style={{ marginBottom: 30 }}>
            {companyInfo.mission && (
              <div className="neu-card">
                <h2 style={{ fontSize: '1.25rem', marginBottom: 10 }}>Our Mission</h2>
                <p style={{ margin: 0, color: 'var(--text-body)' }}>{companyInfo.mission}</p>
              </div>
            )}
            {companyInfo.vision && (
              <div className="neu-card">
                <h2 style={{ fontSize: '1.25rem', marginBottom: 10 }}>Our Vision</h2>
                <p style={{ margin: 0, color: 'var(--text-body)' }}>{companyInfo.vision}</p>
              </div>
            )}
          </div>
        )}

        {companyInfo?.values?.length > 0 && (
          <div className="neu-card" style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Company Values</h2>
            <div className="grid-2">
              {companyInfo.values.map((val, idx) => (
                <div
                  key={idx}
                  className="neu-panel-inset"
                  style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
                >
                  <CheckCircle size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div
          className="neu-card"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: '1.25rem' }}>Work With AI Square IT Solutions</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Connect with our management team or apply to join our evaluator workforce.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link to="/contact" className="btn btn-primary">
              Contact Us
              <ArrowRight size={16} />
            </Link>
            <Link to="/careers" className="btn btn-secondary">
              Explore Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
