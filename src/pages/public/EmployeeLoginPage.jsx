import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, HelpCircle, Shield, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function EmployeeLoginPage() {
  const { user, loading, loginEmployee } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showRecoveryHelp, setShowRecoveryHelp] = useState(false);

  if (!loading && user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/portal'} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password) {
      setError('Please enter both your email/username and password.');
      return;
    }

    setSubmitting(true);
    try {
      await loginEmployee(identifier.trim(), password);
      navigate('/portal', { replace: true });
    } catch (err) {
      setError(err.message || 'Sign-in failed. Please verify your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '44px 0 36px' }}>
      <div className="container">
        <div className="hero-stage">
          <div className="hero-glow-orb-1" />
          <div className="grid-2" style={{ alignItems: 'center', gap: 38, position: 'relative', zIndex: 2 }}>
            {/* Left Visual Showcase */}
            <div className="animate-fade-up">
              <span className="badge badge-info" style={{ marginBottom: 14 }}>
                <Sparkles size={14} />
                Employee Evaluator Workspace
              </span>
              <h1 style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.45rem)', fontWeight: 500, marginBottom: 12 }}>
                Access Your{' '}
                <span
                  style={{
                    backgroundImage: 'linear-gradient(to left, #6366f1, #a855f7, #fcd34d)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  AI Square
                </span>{' '}
                Portal
              </h1>
              <p style={{ color: 'var(--text-body)', marginBottom: 22 }}>
                Review reference guidelines, complete authorized assessments, inspect released
                results, and track per-project readiness inside your secure employee portal.
              </p>
              <div className="hero-visual-frame animate-float">
                <img
                  src="/images/hero-ai-visual.png"
                  alt="AI Square IT Solutions evaluator portal visual"
                />
              </div>
            </div>

            {/* Right Login Form */}
            <div className="neu-card animate-fade-up">
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.45rem', marginBottom: 6 }}>Employee Sign In</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Use your administrator-provisioned email or username. Public registration is disabled.
                </p>
              </div>

              {error && (
                <div className="alert alert-error" role="alert">
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="emp-id">Email or Username</label>
                  <input
                    id="emp-id"
                    type="text"
                    className="neu-input"
                    placeholder="evaluator1 or email@aisquare.local"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="emp-pwd">Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="emp-pwd"
                      type={showPwd ? 'text' : 'password'}
                      className="neu-input"
                      style={{ paddingRight: 42 }}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((p) => !p)}
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        padding: 4,
                      }}
                    >
                      {showPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: 6 }}
                  disabled={submitting}
                >
                  <LogIn size={17} />
                  {submitting ? 'Signing In...' : 'Sign In to Employee Portal'}
                </button>
              </form>

              <div style={{ marginTop: 16 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => setShowRecoveryHelp((prev) => !prev)}
                  aria-expanded={showRecoveryHelp}
                >
                  <HelpCircle size={15} />
                  {showRecoveryHelp ? 'Hide Password Recovery Guidance' : 'Forgot Password or Need Access?'}
                </button>

                {showRecoveryHelp && (
                  <div className="neu-panel-inset" style={{ marginTop: 12, padding: 14, fontSize: '0.86rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Managed Password Reset:</strong>
                    <p style={{ margin: '6px 0 0', color: 'var(--text-muted)' }}>
                      Contact your AI Square IT Solutions team lead or submit an access request via{' '}
                      <Link to="/contact">Contact Us</Link> so an authorized administrator can issue
                      a temporary password reset.
                    </p>
                  </div>
                )}
              </div>

              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Shield size={14} />
                  Management Access:
                </span>
                <Link to="/admin/login">Administrator Login &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
