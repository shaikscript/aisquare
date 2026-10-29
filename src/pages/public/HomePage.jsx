import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Pause,
  Play,
  BookOpen,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import PublicNavbar from '../../components/PublicNavbar.jsx';
import {
  WORK_DOMAINS,
  DomainEmblem,
  DomainStageGraphic,
} from '../../components/DomainVisuals.jsx';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4';

const HERO_MARQUEE_ITEMS = [
  { letter: 'A', name: 'AI Evaluation' },
  { letter: 'S', name: 'Search Quality' },
  { letter: 'R', name: 'Response Review' },
  { letter: 'D', name: 'Data Annotation' },
  { letter: 'C', name: 'Content Evaluation' },
  { letter: 'Q', name: 'AI Quality Assurance' },
];

const WORKFLOW_PILLARS = [
  {
    step: '01',
    icon: BookOpen,
    title: 'Centralized Guideline Calibration',
    description:
      'Evaluators prepare directly against version-controlled project guidelines and rubrics inside our internal workspace before task execution.',
  },
  {
    step: '02',
    icon: Layers,
    title: 'Structured Readiness Assessments',
    description:
      'Practical scenario evaluations, timed assessments, and manual rubric reviews verify comprehension across every AI evaluation domain.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Controlled Quality & Sign-Off',
    description:
      'Administrators track per-project readiness approvals and maintain transparent audit visibility across ongoing evaluation workflows.',
  },
];

export default function HomePage() {
  const videoRef = useRef(null);
  const [domainIndex, setDomainIndex] = useState(0);
  const [domainAutoPlay, setDomainAutoPlay] = useState(true);

  // Custom requestAnimationFrame fade loop (0.5s fade-in, 0.5s fade-out, 100ms replay delay)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let rafId = null;
    let replayTimeout = null;
    let isUnmounted = false;

    video.style.opacity = '0';

    const tick = () => {
      if (isUnmounted) return;
      const v = videoRef.current;
      if (v && !v.paused && !v.ended && Number.isFinite(v.duration) && v.duration > 0) {
        const t = v.currentTime;
        const d = v.duration;
        let nextOpacity = 1;

        if (t < 0.5) {
          nextOpacity = Math.max(0, Math.min(1, t / 0.5));
        } else if (d - t < 0.5) {
          nextOpacity = Math.max(0, Math.min(1, (d - t) / 0.5));
        }
        v.style.opacity = String(nextOpacity);
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      if (isUnmounted || !videoRef.current) return;
      videoRef.current.style.opacity = '0';
      replayTimeout = setTimeout(() => {
        if (isUnmounted || !videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }, 100);
    };

    const startPlayback = () => {
      if (isUnmounted || !videoRef.current) return;
      videoRef.current.play().catch(() => {});
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', startPlayback);
    startPlayback();
    rafId = requestAnimationFrame(tick);

    return () => {
      isUnmounted = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (replayTimeout) clearTimeout(replayTimeout);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', startPlayback);
    };
  }, []);

  useEffect(() => {
    if (!domainAutoPlay) return undefined;
    const timer = setInterval(() => {
      setDomainIndex((prev) => (prev + 1) % WORK_DOMAINS.length);
    }, 4800);
    return () => clearInterval(timer);
  }, [domainAutoPlay]);

  const activeDomain = WORK_DOMAINS[domainIndex];

  const handleSelectDomain = (idx) => {
    setDomainIndex(idx);
    setDomainAutoPlay(false);
  };

  return (
    <div>
      {/* =====================================================================
          1. FULL-SCREEN FUTURISTIC VIDEO HERO SECTION
         ===================================================================== */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'hsl(260, 87%, 3%)',
          minHeight: '100vh',
        }}
      >
        {/* Looping Background Video (No gradient overlays; JS fade-controlled) */}
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Relative z-10 Hero Column */}
        <section
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'visible',
          }}
        >
          {/* Top Futuristic Navbar */}
          <PublicNavbar />

          {/* Vertically Centered Hero Content + Unclipped Blurred Orb */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'visible',
              padding: '48px 24px',
            }}
          >
            {/* Centered Blurred Overlay Shape (984x527, bg-gray-950, opacity-90, blur-[82px]) */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(984px, 94vw)',
                height: 527,
                opacity: 0.9,
                backgroundColor: '#030712',
                filter: 'blur(82px)',
                WebkitFilter: 'blur(82px)',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Foreground Headline, Subtitle & Liquid-Glass CTA */}
            <div
              className="animate-fade-up"
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: '100%',
              }}
            >
              <h1
                style={{
                  fontFamily: "'General Sans', 'Geist Sans', sans-serif",
                  fontSize: 'clamp(4.2rem, 14vw, 220px)',
                  fontWeight: 400,
                  lineHeight: 1.02,
                  letterSpacing: '-0.024em',
                  margin: 0,
                  color: 'hsl(40, 6%, 95%)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>Square </span>
                <span
                  style={{
                    backgroundImage: 'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  AI
                </span>
              </h1>

              <p
                style={{
                  color: 'hsl(40, 6%, 82%)',
                  fontSize: '1.125rem',
                  lineHeight: '2rem',
                  maxWidth: '28rem',
                  marginTop: 9,
                  marginBottom: 0,
                  opacity: 0.8,
                  fontFamily: 'var(--font-geist)',
                }}
              >
                Human precision deployed across modern
                <br />
                AI evaluation &amp; quality assurance
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  marginTop: 25,
                }}
              >
                <Link
                  to="/contact"
                  className="btn-hero-secondary"
                  style={{
                    padding: '18px 29px',
                    fontSize: '0.96rem',
                  }}
                >
                  Schedule a Consult
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Pinned Liquid-Glass Capability Marquee (pb-10) */}
          <div
            style={{
              width: '100%',
              maxWidth: '64rem',
              margin: '0 auto',
              padding: '0 24px 40px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              className="hero-marquee-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 48,
              }}
            >
              <div
                style={{
                  color: 'hsla(40, 6%, 95%, 0.5)',
                  fontSize: '0.875rem',
                  lineHeight: 1.4,
                  flexShrink: 0,
                }}
              >
                Specialized across
                <br />
                six core AI domains
              </div>

              <div
                className="hero-marquee-viewport"
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  maskImage:
                    'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
                }}
              >
                <div className="hero-marquee-track">
                  {[...HERO_MARQUEE_ITEMS, ...HERO_MARQUEE_ITEMS].map((item, idx) => (
                    <div
                      key={`${item.name}-${idx}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span
                        className="liquid-glass"
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 8,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: 'hsl(40, 6%, 95%)',
                          flexShrink: 0,
                        }}
                      >
                        {item.letter}
                      </span>
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'hsl(40, 6%, 95%)',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================================
          2. OPERATIONAL METHODOLOGY (3 LIQUID-GLASS PILLARS)
         ===================================================================== */}
      <section style={{ padding: '72px 0 24px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 38px' }}>
            <span className="badge badge-info" style={{ marginBottom: 12 }}>
              Operational Methodology
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.45rem)',
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Disciplined Human-in-the-Loop Execution
            </h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.98rem' }}>
              Every evaluator works within a structured preparation, assessment, and readiness
              framework built for consistent AI quality.
            </p>
          </div>

          <div className="grid-3">
            {WORKFLOW_PILLARS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className={`neu-card-compact kpi-card animate-fade-up stagger-${idx + 1}`}
                  style={{ padding: 26 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <div className="kpi-icon-box">
                      <Icon size={19} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color: 'hsla(40, 6%, 82%, 0.45)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      STEP {item.step}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.16rem', fontWeight: 500, marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE 6-DOMAIN VISUAL SHOWCASE (COSMIC LIQUID GLASS)
         ===================================================================== */}
      <section id="showcase-our-work" style={{ padding: '56px 0 48px' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div>
              <span className="badge badge-info" style={{ marginBottom: 10 }}>
                Core Specializations
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.55rem)',
                  fontWeight: 500,
                  marginBottom: 8,
                }}
              >
                AI Evaluation &amp; Quality Domains
              </h2>
              <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: 660 }}>
                Select any specialization below to inspect how our trained evaluator workforce
                approaches quality verification.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setDomainAutoPlay((p) => !p)}
                aria-label={domainAutoPlay ? 'Pause domain slideshow' : 'Play domain slideshow'}
              >
                {domainAutoPlay ? <Pause size={14} /> : <Play size={14} />}
                {domainAutoPlay ? 'Auto-Cycle' : 'Paused'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setDomainAutoPlay(false);
                  setDomainIndex((prev) => (prev - 1 + WORK_DOMAINS.length) % WORK_DOMAINS.length);
                }}
                aria-label="Previous domain"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setDomainAutoPlay(false);
                  setDomainIndex((prev) => (prev + 1) % WORK_DOMAINS.length);
                }}
                aria-label="Next domain"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Spotlight Slide Stage */}
          <div className="neu-card" style={{ marginBottom: 24 }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: 34 }}>
              <div key={activeDomain.id} className="animate-fade-up">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <DomainEmblem id={activeDomain.id} size={56} />
                  <div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.09em',
                        color: '#fcd34d',
                        textTransform: 'uppercase',
                      }}
                    >
                      0{domainIndex + 1} / 0{WORK_DOMAINS.length} &bull; {activeDomain.tagline}
                    </span>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 500, margin: '4px 0 0' }}>
                      {activeDomain.title}
                    </h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-body)', fontSize: '0.98rem', marginBottom: 18 }}>
                  {activeDomain.summary}
                </p>

                <div style={{ display: 'grid', gap: 9, marginBottom: 24 }}>
                  {activeDomain.highlights.map((pt) => (
                    <div
                      key={pt}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 9,
                        fontSize: '0.91rem',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <CheckCircle2 size={17} color="#c084fc" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/contact?topic=${encodeURIComponent(activeDomain.title)}`}
                  className="btn-hero-secondary"
                  style={{ padding: '10px 22px', fontSize: '0.88rem' }}
                >
                  Enquire About {activeDomain.title}
                  <ArrowRight size={15} />
                </Link>
              </div>

              <DomainStageGraphic domain={activeDomain} />
            </div>
          </div>

          {/* 6 Interactive Domain Cards */}
          <div className="grid-3">
            {WORK_DOMAINS.map((domain, idx) => {
              const isSelected = idx === domainIndex;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => handleSelectDomain(idx)}
                  className={`showcase-card-btn${isSelected ? ' selected' : ''}`}
                  aria-pressed={isSelected}
                >
                  <div style={{ width: '100%' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 14,
                      }}
                    >
                      <DomainEmblem id={domain.id} size={46} />
                      <span
                        className={`badge ${isSelected ? 'badge-info' : 'badge-neutral'}`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {isSelected ? 'Active Spotlight' : `0${idx + 1}`}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.16rem', fontWeight: 500, marginBottom: 6 }}>
                      {domain.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.88rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.58,
                      }}
                    >
                      {domain.summary}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: isSelected ? '#fcd34d' : '#c4b5fd',
                    }}
                  >
                    <span>{isSelected ? 'Viewing in Stage' : 'Inspect Workflow'}</span>
                    <ArrowRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. DUAL FUTURISTIC CALL-TO-ACTION CARDS
         ===================================================================== */}
      <section style={{ padding: '12px 0 32px' }}>
        <div className="container">
          <div className="grid-2">
            <div
              className="neu-card"
              style={{
                background:
                  'linear-gradient(145deg, rgba(99, 102, 241, 0.18) 0%, rgba(168, 85, 247, 0.14) 55%, rgba(252, 211, 77, 0.08) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className="badge badge-info" style={{ marginBottom: 14 }}>
                  For Client Teams
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: 10 }}>
                  Need a Trained AI Evaluation Team?
                </h3>
                <p style={{ color: 'var(--text-body)', marginBottom: 24, fontSize: '0.95rem' }}>
                  Connect with AI Square IT Solutions to discuss your evaluation guidelines,
                  annotation workflows, or quality assurance requirements.
                </p>
              </div>
              <div>
                <Link
                  to="/contact"
                  className="btn-hero-secondary"
                  style={{ padding: '12px 24px' }}
                >
                  <Mail size={16} />
                  Submit a Business Enquiry
                </Link>
              </div>
            </div>

            <div
              className="neu-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span className="badge badge-neutral" style={{ marginBottom: 14 }}>
                  Evaluator Careers
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: 10 }}>
                  Build Your Career in AI Evaluation
                </h3>
                <p style={{ color: 'var(--text-body)', marginBottom: 24, fontSize: '0.95rem' }}>
                  Explore open evaluator roles or submit a general application to join our trained
                  AI quality workforce.
                </p>
              </div>
              <div>
                <Link to="/careers" className="btn btn-primary">
                  <Briefcase size={16} />
                  Explore Open Roles &amp; Apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
