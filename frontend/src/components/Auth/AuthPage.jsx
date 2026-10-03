import { useState } from 'react';
import { ShieldIcon, LockIcon, CheckIcon } from '../common/Icons';
import './AuthPage.css';

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('mehak@prahari.ai');
  const [password, setPassword] = useState('Prahari@2026Secure!');
  const [role, setRole] = useState('Investigator');
  const [mfaCode, setMfaCode] = useState('482910');
  const [requireMfa, setRequireMfa] = useState(true);
  const [step, setStep] = useState('credentials'); // 'credentials' | 'mfa'

  // Sign up fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupDept, setSignupDept] = useState('SOC Team');
  const [signupRole, setSignupRole] = useState('Investigator');
  const [signupPass, setSignupPass] = useState('');
  const [consent, setConsent] = useState(false);
  const [submittedSignup, setSubmittedSignup] = useState(false);

  // Password Policy calculations
  const hasLength = signupPass.length >= 12;
  const hasUpper = /[A-Z]/.test(signupPass);
  const hasLower = /[a-z]/.test(signupPass);
  const hasNumber = /[0-9]/.test(signupPass);
  const hasSpecial = /[^A-Za-z0-9]/.test(signupPass);
  const passScore = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    if (requireMfa) {
      setStep('mfa');
    } else {
      onLogin({ email, role, mfaVerified: false });
    }
  };

  const handleMfaSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, role, mfaVerified: true });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;
    setSubmittedSignup(true);
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container">
        {/* Header Brand */}
        <div className="auth-header">
          <div className="auth-brand">
            <ShieldIcon size={24} color="var(--color-primary)" />
            <span className="auth-brand-name">PrahariAI</span>
          </div>
          <p className="text-secondary text-body-sm">
            AI-Powered Sentinel for Pre-Exam Paper Leak Detection
          </p>
          <span className="badge badge-info" style={{ marginTop: 6 }}>
            SECURE ENTERPRISE AUTHENTICATION (AES-256)
          </span>
        </div>

        {/* Auth Card */}
        <div className="card auth-card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === 'signin' ? 'active' : ''}`}
              onClick={() => { setTab('signin'); setStep('credentials'); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${tab === 'signup' ? 'active' : ''}`}
              onClick={() => setTab('signup')}
            >
              Request Access (Sign Up)
            </button>
          </div>

          {/* Tab 1: SIGN IN */}
          {tab === 'signin' && (
            step === 'credentials' ? (
              <form onSubmit={handleCredentialsSubmit} className="auth-form">
                <div className="form-group">
                  <label className="text-caption font-semibold">Investigator Email / Official ID</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="investigator@prahari.ai"
                  />
                </div>

                <div className="form-group">
                  <label className="text-caption font-semibold">Account Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-caption font-semibold">Select RBAC Test Role</label>
                  <select value={role} onChange={e => setRole(e.target.value)} className="select-input">
                    <option value="Investigator">Investigator (Mehak - SOC Team)</option>
                    <option value="Admin">System Administrator</option>
                    <option value="Auditor">Legal & Compliance Auditor</option>
                    <option value="Viewer">Read-Only Observer</option>
                  </select>
                </div>

                <div className="checkbox-row">
                  <label className="text-caption" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={requireMfa}
                      onChange={e => setRequireMfa(e.target.checked)}
                    />
                    Enforce Multi-Factor Authentication (MFA TOTP)
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 8 }}>
                  Continue to Identity Verification →
                </button>
              </form>
            ) : (
              <form onSubmit={handleMfaSubmit} className="auth-form animate-slide-in">
                <div className="mfa-banner card">
                  <LockIcon size={20} color="var(--risk-info)" />
                  <div>
                    <strong className="text-body-sm">Multi-Factor Authentication Required</strong>
                    <p className="text-caption text-secondary">
                      Enter the 6-digit TOTP code generated by your authenticator app for <strong>{email}</strong>.
                    </p>
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: 12 }}>
                  <label className="text-caption font-semibold">6-Digit Security Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={mfaCode}
                    onChange={e => setMfaCode(e.target.value)}
                    className="text-mono text-center mfa-input"
                  />
                </div>

                <div className="mfa-actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep('credentials')}>
                    ← Back to Credentials
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Verify MFA & Launch Dashboard
                  </button>
                </div>
              </form>
            )
          )}

          {/* Tab 2: SIGN UP */}
          {tab === 'signup' && (
            submittedSignup ? (
              <div className="signup-success card text-center animate-slide-in">
                <span className="badge badge-low" style={{ margin: '0 auto 12px auto' }}>REQUEST SUBMITTED</span>
                <h3 className="text-h3">Access Request Pending Approval</h3>
                <p className="text-secondary text-body-sm" style={{ marginTop: 8 }}>
                  Your sign-up request for <strong>{signupEmail}</strong> has been logged to the administrative approval queue. An Administrator will review your department credentials.
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 16 }}
                  onClick={() => { setSubmittedSignup(false); setTab('signin'); }}
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignupSubmit} className="auth-form">
                <div className="form-group">
                  <label className="text-caption font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mehak Sharma"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-caption font-semibold">Official Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="m.sharma@prahari.ai"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="text-caption font-semibold">Department</label>
                    <select value={signupDept} onChange={e => setSignupDept(e.target.value)}>
                      <option>SOC Team</option>
                      <option>IT Security</option>
                      <option>Legal & Compliance</option>
                      <option>Examination Logistics</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="text-caption font-semibold">Requested Role</label>
                    <select value={signupRole} onChange={e => setSignupRole(e.target.value)}>
                      <option value="Investigator">Investigator</option>
                      <option value="Auditor">Auditor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="text-caption font-semibold">New Password (Enforced Policy)</label>
                  <input
                    type="password"
                    required
                    placeholder="At least 12 characters..."
                    value={signupPass}
                    onChange={e => setSignupPass(e.target.value)}
                  />
                  {/* Password Policy Indicators */}
                  <div className="pass-policy-meter">
                    <div className="policy-bars">
                      {[1, 2, 3, 4, 5].map(lvl => (
                        <div
                          key={lvl}
                          className="policy-bar"
                          style={{
                            background: lvl <= passScore
                              ? passScore >= 4 ? 'var(--risk-low)' : passScore >= 3 ? 'var(--risk-medium)' : 'var(--risk-critical)'
                              : 'var(--border-default)'
                          }}
                        />
                      ))}
                    </div>
                    <div className="policy-checklist text-caption">
                      <span className={hasLength ? 'text-low' : 'text-tertiary'}>{hasLength ? '✓' : '•'} 12+ Chars</span>
                      <span className={hasUpper ? 'text-low' : 'text-tertiary'}>{hasUpper ? '✓' : '•'} Uppercase</span>
                      <span className={hasLower ? 'text-low' : 'text-tertiary'}>{hasLower ? '✓' : '•'} Lowercase</span>
                      <span className={hasNumber ? 'text-low' : 'text-tertiary'}>{hasNumber ? '✓' : '•'} Number</span>
                      <span className={hasSpecial ? 'text-low' : 'text-tertiary'}>{hasSpecial ? '✓' : '•'} Special Symbol</span>
                    </div>
                  </div>
                </div>

                <div className="checkbox-row" style={{ marginTop: 8 }}>
                  <label className="text-caption text-secondary" style={{ display: 'flex', alignItems: 'flex-start', gap: 6, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      style={{ marginTop: 2 }}
                    />
                    <span>
                      I acknowledge the Employee Security Monitoring Disclosure & Audit Trail policy. All operations are permanently logged for audit compliance.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: 12 }}
                  disabled={!consent}
                >
                  Submit Access Request →
                </button>
              </form>
            )
          )}
        </div>

        {/* Security Footer */}
        <div className="auth-footer text-caption text-tertiary text-center">
          🔒 TLS 1.3 Encrypted Connection · Session Lock: 30 Min Inactivity Policy
        </div>
      </div>
    </div>
  );
}
