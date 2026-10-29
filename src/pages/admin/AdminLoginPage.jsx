import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Lock,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  Eye,
  EyeOff,
  KeyRound,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo.jsx';
import { CosmicBrandMark } from '../../components/PublicNavbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiRequest } from '../../utils/api.js';

export default function AdminLoginPage() {
  const { user, loading, loginAdmin, bootstrapInitialAdmin } = useAuth();
  const navigate = useNavigate();

  const [checkingSetup, setCheckingSetup] = useState(true);
  const [needsInitialAdmin, setNeedsInitialAdmin] = useState(false);

  // Login fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginPwd, setShowLoginPwd] = useState(false);

  // First-run bootstrap fields (shown ONLY when 0 admin accounts exist in database)
  const [bootstrapToken, setBootstrapToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [setupPassword, setSetupPassword] = useState('');
  const [confirmSetupPassword, setConfirmSetupPassword] = useState('');
  const [showSetupPwd, setShowSetupPwd] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/api/auth/setup-status')
      .then((res) => setNeedsInitialAdmin(Boolean(res.needsInitialAdmin)))
      .catch(() => setNeedsInitialAdmin(false))
      .finally(() => setCheckingSetup(false));
  }, []);

  if (!loading && user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await loginAdmin(identifier.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Administrator authentication failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBootstrap = async (e) => {
    e.preventDefault();
    setError('');

    if (setupPassword !== confirmSetupPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await bootstrapInitialAdmin({
        bootstrapToken: bootstrapToken.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        username: username.trim().toLowerCase(),
        password: setupPassword,
      });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Initial administrator setup failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cosmic-auth-stage">
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '18%',
          left: '22%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '20%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          filter: 'blur(64px)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="neu-card animate-fade-up"
        style={{
          width: '100%',
          maxWidth: 510,
          position: 'relative',
          zIndex: 2,
          border: '1px solid rgba(255, 255, 255, 0.14)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 22,
          }}
        >
          <CosmicBrandMark size={34} />
          <span className="badge badge-info">
            {needsInitialAdmin ? 'First-Time Setup' : 'Admin Access'}
          </span>
        </div>

        {user && user.role === 'employee' && (
          <div className="alert alert-warn" role="alert">
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              You are currently signed in as an <strong>Employee</strong> ({user.employeeCode}).
              Employee accounts cannot access the Admin Portal.{' '}
              <Link to="/portal">Return to Employee Portal</Link>.
            </div>
          </div>
        )}

        {checkingSetup ? (
          <div style={{ padding: '16px 0', color: 'var(--text-muted)' }}>
            Checking administrator setup status...
          </div>
        ) : needsInitialAdmin ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <ShieldCheck size={24} color="var(--accent-primary)" />
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
                Establish Primary Administrator
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.91rem', marginBottom: 20 }}>
              No administrator account exists yet for <strong>AI Square IT Solutions</strong>. Enter
              the one-time Setup Token and choose your administrator credentials below. Once
              completed, this setup screen permanently locks.
            </p>

            {error && (
              <div className="alert alert-error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleBootstrap}>
              <div className="form-group">
                <label className="form-label" htmlFor="bs-token">
                  One-Time Server Setup Token *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="bs-token"
                    type="text"
                    className="neu-input"
                    placeholder="Paste your one-time setup token"
                    value={bootstrapToken}
                    onChange={(e) => setBootstrapToken(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
                <span className="form-hint">
                  Verifies server ownership (from <code>data/.bootstrap_token</code>) without hardcoded credentials.
                </span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="bs-name">
                  Administrator Full Name *
                </label>
                <input
                  id="bs-name"
                  type="text"
                  className="neu-input"
                  placeholder="e.g., Founder / Operations Director"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="grid-2" style={{ gap: 12 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="bs-email">
                    Admin Email *
                  </label>
                  <input
                    id="bs-email"
                    type="email"
                    className="neu-input"
                    placeholder="admin@aisquare.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="bs-user">
                    Admin Username *
                  </label>
                  <input
                    id="bs-user"
                    type="text"
                    className="neu-input"
                    placeholder="e.g., aisquare.admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    required
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: 12 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="bs-pwd">
                    Create Strong Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="bs-pwd"
                      type={showSetupPwd ? 'text' : 'password'}
                      className="neu-input"
                      style={{ paddingRight: 42 }}
                      placeholder="Min 8 chars (letters + numbers)"
                      value={setupPassword}
                      onChange={(e) => setSetupPassword(e.target.value)}
                      minLength={8}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSetupPwd((p) => !p)}
                      aria-label={showSetupPwd ? 'Hide password' : 'Show password'}
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
                      {showSetupPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="bs-conf-pwd">
                    Confirm Password *
                  </label>
                  <input
                    id="bs-conf-pwd"
                    type={showSetupPwd ? 'text' : 'password'}
                    className="neu-input"
                    placeholder="Re-enter password"
                    value={confirmSetupPassword}
                    onChange={(e) => setConfirmSetupPassword(e.target.value)}
                    minLength={8}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 6 }}
                disabled={submitting}
              >
                <KeyRound size={17} />
                {submitting ? 'Establishing Administrator Account...' : 'Create Primary Administrator & Sign In'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 style={{ fontSize: '1.55rem', marginBottom: 6 }}>Administrator Sign In</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>
              Authorized AI Square IT Solutions management access only. All administrative actions
              are recorded in the audit log.
            </p>

            {error && (
              <div className="alert alert-error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label" htmlFor="adm-id">
                  Admin Email or Username
                </label>
                <input
                  id="adm-id"
                  type="text"
                  className="neu-input"
                  placeholder="Administrator email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="adm-pwd">
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="adm-pwd"
                    type={showLoginPwd ? 'text' : 'password'}
                    className="neu-input"
                    style={{ paddingRight: 42 }}
                    placeholder="Enter administrator password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPwd((p) => !p)}
                    aria-label={showLoginPwd ? 'Hide password' : 'Show password'}
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
                    {showLoginPwd ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 6 }}
                disabled={submitting}
              >
                <Lock size={16} />
                {submitting ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}
              </button>
            </form>
          </div>
        )}

        <div
          style={{
            marginTop: 22,
            paddingTop: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
          }}
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft size={14} />
            Public Website
          </Link>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>v2.5</span>
          <Link to="/login">Employee Login &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
