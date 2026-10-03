import { dashboardStats } from '../../data/mockData';
import { ShieldIcon, BellIcon, ClockIcon } from '../common/Icons';
import './TopBar.css';

export default function TopBar() {
  const countdown = dashboardStats.examCountdown;
  const countdownBadgeClass = countdown <= 1 ? 'badge-critical' : countdown <= 3 ? 'badge-high' : 'badge-info';

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
          <span className="topbar-meta hide-mobile">
            {dashboardStats.totalAssets.toLocaleString()} Custody Assets Monitored
          </span>
        </div>
      </div>

      <div className="topbar-right">
        <button className="topbar-icon-btn" title="Alert Notifications" aria-label="Notifications">
          <BellIcon size={16} />
          <span className="notification-count">3</span>
        </button>
        <div className="topbar-user">
          <div className="avatar">MK</div>
          <div className="user-details">
            <span className="user-name">Mehak</span>
            <span className="user-role">Sr. Investigator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
