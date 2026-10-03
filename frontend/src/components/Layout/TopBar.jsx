import { useState } from 'react';
import { dashboardStats } from '../../data/mockData';
import { ShieldIcon, BellIcon, ClockIcon } from '../common/Icons';
import HelpModal from '../common/HelpModal';
import './TopBar.css';

export default function TopBar({ user, onSignOut }) {
  const countdown = dashboardStats.examCountdown;
  const countdownBadgeClass = countdown <= 1 ? 'badge-critical' : countdown <= 3 ? 'badge-high' : 'badge-info';
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="system-brand">
          <span className="brand-symbol">
            <ShieldIcon size={18} color="var(--color-primary)" />
          </span>
          <span className="brand-title">PrahariAI</span>
        </span>
        <span className="topbar-divider" />
        <span className="page-breadcrumb">Pre-Exam Sentinel Control</span>
      </div>

      <div className="topbar-center">
        <div className="topbar-status-group">
          <span className={`badge ${countdownBadgeClass}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ClockIcon size={12} /> {countdown} Days to Exam
          </span>
          <span className="badge badge-low">
            <span className="dot dot-green" /> System Active
          </span>
          <span className="badge badge-purple hide-mobile">
            MFA TOTP Verified
          </span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Help Docs Trigger */}
        <button className="btn btn-ghost btn-sm" onClick={() => setShowHelp(true)} title="System Documentation & Help">
          ? Help Guide
        </button>

        <button className="topbar-icon-btn" title="Alert Notifications" aria-label="Notifications">
          <BellIcon size={16} />
          <span className="notification-count">3</span>
        </button>

        {/* User Profile */}
        <div className="topbar-user">
          <div className="avatar">
            {user?.role === 'Admin' ? 'AD' : user?.role === 'Auditor' ? 'AU' : user?.role === 'Viewer' ? 'VW' : 'MK'}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.role === 'Investigator' ? 'Mehak' : user?.email?.split('@')[0] || 'User'}</span>
            <span className="user-role">{user?.role || 'Investigator'}</span>
          </div>
        </div>

        {/* Sign Out Trigger */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={onSignOut}
          title="Sign Out of Session"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Sign Out
        </button>
      </div>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </header>
  );
}
