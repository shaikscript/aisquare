import React from 'react';

export const WORK_DOMAINS = [
  {
    id: 'ai-evaluation',
    title: 'AI Evaluation',
    tagline: 'Structured Human-in-the-Loop Model Assessment',
    summary:
      'Trained evaluators assess AI outputs across instruction adherence, reasoning depth, contextual accuracy, and task completion using structured rubrics.',
    highlights: [
      'Multi-dimensional rubric scoring',
      'Side-by-side output comparison',
      'Clear evaluator rationale',
    ],
    accent: '#2563eb',
    accentSecondary: '#0ea5e9',
  },
  {
    id: 'search-quality',
    title: 'Search Quality Evaluation',
    tagline: 'Query Intent, Relevance & Ranking Precision',
    summary:
      'Evaluating how accurately search results satisfy user intent, query context, freshness, and usefulness across diverse informational and navigational queries.',
    highlights: [
      'User intent interpretation',
      'Result relevance & utility grading',
      'Query-to-result alignment checks',
    ],
    accent: '#0284c7',
    accentSecondary: '#38bdf8',
  },
  {
    id: 'ai-response',
    title: 'AI Response Evaluation',
    tagline: 'Conversational Clarity, Helpfulness & Grounding',
    summary:
      'Reviewing AI-generated responses for helpfulness, tone appropriateness, factual grounding, completeness, and adherence to prompt constraints.',
    highlights: [
      'Prompt constraint verification',
      'Response clarity & tone review',
      'Hallucination & accuracy checks',
    ],
    accent: '#4f46e5',
    accentSecondary: '#3b82f6',
  },
  {
    id: 'data-annotation',
    title: 'Data Annotation',
    tagline: 'Clean, Structured Labeling for AI Workflows',
    summary:
      'Organizing, tagging, and categorizing structured text, intent classifications, entities, and workflow datasets according to precise project schemas.',
    highlights: [
      'Taxonomy & entity classification',
      'Consistent guideline-driven tagging',
      'Structured dataset preparation',
    ],
    accent: '#0369a1',
    accentSecondary: '#06b6d4',
  },
  {
    id: 'content-evaluation',
    title: 'Content Evaluation',
    tagline: 'Policy Alignment, Readability & Contextual Review',
    summary:
      'Examining digital content and generated media against defined quality, safety, clarity, and appropriateness guidelines with objective human judgment.',
    highlights: [
      'Guideline & policy alignment',
      'Coherence & readability checks',
      'Contextual appropriateness review',
    ],
    accent: '#1d4ed8',
    accentSecondary: '#60a5fa',
  },
  {
    id: 'ai-qa',
    title: 'AI Quality Assurance',
    tagline: 'Systematic Calibration & Output Verification',
    summary:
      'Supporting reliable AI workflows through structured quality checks, edge-case verification, rubric consistency reviews, and disciplined issue reporting.',
    highlights: [
      'Edge-case & regression review',
      'Rubric consistency verification',
      'Structured quality validation',
    ],
    accent: '#1e40af',
    accentSecondary: '#0284c7',
  },
];

/**
 * Custom multi-layered SVG Emblem Logo for each of the 6 AI Square work areas.
 */
export function DomainEmblem({ id, size = 52 }) {
  return (
    <div
      className="domain-emblem"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: 'linear-gradient(145deg, #ffffff 0%, #f1f7ff 100%)',
        boxShadow: '0 4px 12px -2px rgba(37, 99, 235, 0.12), inset 0 1px 0 #ffffff',
        border: '1px solid rgba(37, 99, 235, 0.15)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {id === 'ai-evaluation' && (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 40 40" fill="none">
          <defs>
            <linearGradient id="emb1" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          <polygon points="20,4 35,12.5 35,27.5 20,36 5,27.5 5,12.5" fill="url(#emb1)" fillOpacity="0.14" stroke="url(#emb1)" strokeWidth="2.4" />
          <circle cx="20" cy="20" r="5" fill="url(#emb1)" />
          <path d="M20 4V15M35 12.5L24.5 17.5M35 27.5L24.5 22.5M20 36V25M5 27.5L15.5 22.5M5 12.5L15.5 17.5" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}

      {id === 'search-quality' && (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 40 40" fill="none">
          <circle cx="18" cy="18" r="11" fill="#0ea5e9" fillOpacity="0.15" stroke="#0284c7" strokeWidth="2.6" />
          <path d="M26 26L35 35" stroke="#2563eb" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M13 18H23M18 13V23" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}

      {id === 'ai-response' && (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 40 40" fill="none">
          <rect x="4" y="6" width="24" height="17" rx="5" fill="#4f46e5" fillOpacity="0.14" stroke="#4f46e5" strokeWidth="2.4" />
          <rect x="12" y="17" width="24" height="17" rx="5" fill="#ffffff" stroke="#2563eb" strokeWidth="2.4" />
          <path d="M18 25.5L22 29L30 21.5" stroke="#0ea5e9" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {id === 'data-annotation' && (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 40 40" fill="none">
          <rect x="7" y="7" width="26" height="26" rx="4" stroke="#0369a1" strokeWidth="2.2" strokeDasharray="4 3" />
          <rect x="4" y="4" width="6" height="6" rx="1.5" fill="#2563eb" />
          <rect x="30" y="4" width="6" height="6" rx="1.5" fill="#0ea5e9" />
          <rect x="4" y="30" width="6" height="6" rx="1.5" fill="#0ea5e9" />
          <rect x="30" y="30" width="6" height="6" rx="1.5" fill="#2563eb" />
          <rect x="13" y="14" width="14" height="12" rx="3" fill="#0284c7" fillOpacity="0.18" stroke="#0284c7" strokeWidth="2" />
        </svg>
      )}

      {id === 'content-evaluation' && (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 40 40" fill="none">
          <rect x="7" y="5" width="26" height="30" rx="5" fill="#2563eb" fillOpacity="0.12" stroke="#1d4ed8" strokeWidth="2.4" />
          <path d="M13 13H27M13 19H27M13 25H20" stroke="#1d4ed8" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="28" cy="27" r="6.5" fill="#0ea5e9" />
          <path d="M25.2 27L27.2 29L31 25" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {id === 'ai-qa' && (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 40 40" fill="none">
          <path
            d="M20 4L33 9.5V19.5C33 27.8 27.4 34.4 20 36.8C12.6 34.4 7 27.8 7 19.5V9.5L20 4Z"
            fill="#1e40af"
            fillOpacity="0.14"
            stroke="#1e40af"
            strokeWidth="2.4"
          />
          <path
            d="M14.5 20.2L18.3 24L26 16"
            stroke="#0284c7"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

/**
 * Animated Interactive Soft-UI Graphic Stage rendered inside the Showcase Slider.
 */
export function DomainStageGraphic({ domain }) {
  return (
    <div className="domain-stage-graphic" key={domain.id}>
      <div className="domain-stage-orb" />

      {/* Top Glass Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 14,
          marginBottom: 16,
          borderBottom: '1px solid rgba(37, 99, 235, 0.12)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: domain.accent,
              boxShadow: `0 0 10px ${domain.accent}`,
            }}
          />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
            WORKFLOW PREVIEW &bull; {domain.title.toUpperCase()}
          </span>
        </div>
        <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>
          Human-Verified
        </span>
      </div>

      {/* Domain-Specific Animated Interactive Diagram */}
      {domain.id === 'ai-evaluation' && (
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            { label: 'Instruction Following', pct: '96%', width: '92%' },
            { label: 'Reasoning & Coherence', pct: '91%', width: '86%' },
            { label: 'Contextual Grounding', pct: '94%', width: '90%' },
          ].map((bar, i) => (
            <div key={i} className="neu-panel-inset" style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, marginBottom: 6 }}>
                <span>{bar.label}</span>
                <span style={{ color: domain.accent }}>Rubric Aligned</span>
              </div>
              <div style={{ height: 8, borderRadius: 99, background: 'rgba(148, 163, 184, 0.2)', overflow: 'hidden' }}>
                <div
                  className="animated-bar-fill"
                  style={{
                    width: bar.width,
                    height: '100%',
                    borderRadius: 99,
                    background: 'linear-gradient(90deg, #6366f1, #a855f7, #fcd34d)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {domain.id === 'search-quality' && (
        <div style={{ display: 'grid', gap: 10 }}>
          <div className="neu-panel-inset" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Query Intent Analysis</span>
            <span className="badge badge-success">High Match</span>
          </div>
          <div className="grid-2" style={{ gap: 10 }}>
            <div className="neu-card-compact" style={{ padding: 14 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CANDIDATE RESULT A</div>
              <div style={{ fontWeight: 700, marginTop: 4, color: 'var(--text-primary)' }}>Fully Meets Intent</div>
              <div style={{ fontSize: '0.8rem', color: '#0284c7', marginTop: 4 }}>Authoritative &bull; Direct Answer</div>
            </div>
            <div className="neu-card-compact" style={{ padding: 14 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CANDIDATE RESULT B</div>
              <div style={{ fontWeight: 700, marginTop: 4, color: 'var(--text-primary)' }}>Partially Meets</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Broad Context Only</div>
            </div>
          </div>
        </div>
      )}

      {domain.id === 'ai-response' && (
        <div style={{ display: 'grid', gap: 10 }}>
          <div className="grid-2" style={{ gap: 10 }}>
            <div className="neu-card-compact" style={{ padding: 14, border: '1.5px solid #a855f7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#c084fc' }}>RESPONSE A</span>
                <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>Preferred</span>
              </div>
              <div style={{ height: 6, width: '90%', background: 'rgba(168, 85, 247, 0.35)', borderRadius: 4, marginBottom: 6 }} />
              <div style={{ height: 6, width: '75%', background: 'rgba(99, 102, 241, 0.35)', borderRadius: 4, marginBottom: 6 }} />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Accurate, structured &amp; complete</div>
            </div>
            <div className="neu-card-compact" style={{ padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)' }}>RESPONSE B</span>
                <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>Reviewed</span>
              </div>
              <div style={{ height: 6, width: '85%', background: 'rgba(148, 163, 184, 0.22)', borderRadius: 4, marginBottom: 6 }} />
              <div style={{ height: 6, width: '60%', background: 'rgba(148, 163, 184, 0.22)', borderRadius: 4, marginBottom: 6 }} />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Missed secondary constraint</div>
            </div>
          </div>
          <div className="neu-panel-inset" style={{ padding: '10px 14px', fontSize: '0.82rem' }}>
            <strong>Evaluator Rationale:</strong> Verified factual claims &amp; formatting rules against prompt rubric.
          </div>
        </div>
      )}

      {domain.id === 'data-annotation' && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="neu-panel-inset" style={{ padding: 14 }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
              STRUCTURED ENTITY &amp; INTENT TAGGING
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span className="badge badge-info">[Entity: Technical Spec]</span>
              <span className="badge badge-success">[Intent: Analytical Query]</span>
              <span className="badge badge-neutral">[Domain: Enterprise IT]</span>
              <span className="badge badge-info">[Sentiment: Neutral-Objective]</span>
            </div>
          </div>
          <div className="neu-card-compact" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>Schema Validation Check</span>
            <span className="badge badge-success">100% Tag Integrity</span>
          </div>
        </div>
      )}

      {domain.id === 'content-evaluation' && (
        <div style={{ display: 'grid', gap: 10 }}>
          {[
            { check: 'Policy & Safety Guideline Compliance', state: 'Verified' },
            { check: 'Clarity, Tone & Audience Appropriateness', state: 'Verified' },
            { check: 'Contextual Accuracy & Completeness', state: 'Verified' },
          ].map((row, idx) => (
            <div
              key={idx}
              className="neu-card-compact"
              style={{ padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{row.check}</span>
              <span className="badge badge-success">{row.state}</span>
            </div>
          ))}
        </div>
      )}

      {domain.id === 'ai-qa' && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div className="grid-3" style={{ gap: 10 }}>
            {[
              { title: 'Guideline Sync', sub: 'Calibrated' },
              { title: 'Edge Cases', sub: 'Inspected' },
              { title: 'QA Sign-Off', sub: 'Controlled' },
            ].map((box, idx) => (
              <div key={idx} className="neu-panel-inset" style={{ padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{box.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{box.sub}</div>
              </div>
            ))}
          </div>
          <div className="neu-card-compact" style={{ padding: '12px 14px', fontSize: '0.83rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Continuous Human-in-the-Loop Quality Gate</span>
            <span className="badge badge-info">Active</span>
          </div>
        </div>
      )}
    </div>
  );
}
