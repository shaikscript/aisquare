import React from 'react';

export default function BrandLogo({ subtitle = 'IT SOLUTIONS', compact = false }) {
  const size = compact ? 38 : 44;

  return (
    <div
      className="brand-logo-wrap"
      style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 10 : 12 }}
    >
      <div
        className="brand-emblem-shell"
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: compact ? 11 : 13,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 52%, #06b6d4 100%)',
          boxShadow:
            '0 6px 16px -3px rgba(37, 99, 235, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.38)',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <svg
          width={compact ? 24 : 28}
          height={compact ? 24 : 28}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="7"
            y="7"
            width="23"
            height="23"
            rx="5.5"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeOpacity="0.96"
          />
          <rect
            x="18"
            y="18"
            width="23"
            height="23"
            rx="5.5"
            fill="rgba(255,255,255,0.22)"
            stroke="#E0F2FE"
            strokeWidth="3"
          />
          <circle cx="24" cy="24" r="4" fill="#FFFFFF" />
          <path d="M18 18L24 24L30 30" stroke="#A5F3FC" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="brand-emblem-sheen" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: compact ? '1.02rem' : '1.16rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
            }}
          >
            AI Square
          </span>
          <span
            style={{
              fontSize: compact ? '0.66rem' : '0.7rem',
              fontWeight: 800,
              color: '#0284c7',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(6, 182, 212, 0.16))',
              border: '1px solid rgba(6, 182, 212, 0.24)',
              padding: '1px 5px',
              borderRadius: 5,
            }}
          >
            AI²
          </span>
        </div>
        <span
          style={{
            fontSize: compact ? '0.64rem' : '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.13em',
            color: 'var(--text-muted)',
            marginTop: 2,
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}
