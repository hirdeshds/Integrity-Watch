import { NavLink } from 'react-router-dom';
import { DashboardIcon, BellIcon, MapIcon, GraphIcon, AnalyticsIcon, AuditIcon, ShieldIcon, PackageIcon } from '../common/Icons';
import './Sidebar.css';

const navGroups = [
  {
    title: 'OPERATIONS',
    items: [
      { path: '/', icon: <DashboardIcon size={16} />, label: 'Dashboard' },
      { path: '/alerts', icon: <BellIcon size={16} />, label: 'Alert Queue', badge: 3 },
      { path: '/custody', icon: <MapIcon size={16} />, label: 'Offline Custody' },
      { path: '/online', icon: <PackageIcon size={16} />, label: 'Online Activity' },
    ]
  },
  {
    title: 'INTELLIGENCE & ADMIN',
    items: [
      { path: '/graph', icon: <GraphIcon size={16} />, label: 'Collusion Graph' },
      { path: '/analytics', icon: <AnalyticsIcon size={16} />, label: 'System Analytics' },
      { path: '/audit', icon: <AuditIcon size={16} />, label: 'Audit Trail' },
      { path: '/admin', icon: <ShieldIcon size={16} />, label: 'Admin Panel' },
    ]
  }
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed ? (
          <div className="sidebar-title">NAVIGATION</div>
        ) : (
          <div className="sidebar-title-collapsed">
            <ShieldIcon size={18} color="var(--color-primary)" />
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {navGroups.map(group => (
          <div key={group.title} className="nav-group">
            {!collapsed && <div className="group-title">{group.title}</div>}
            {group.items.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                <span className="nav-icon" title={collapsed ? item.label : ''}>{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
                {item.badge && !collapsed && (
                  <span className="nav-badge">{item.badge}</span>
                )}
                {item.badge && collapsed && (
                  <span className="nav-badge-dot" />
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-toggle-btn" onClick={onToggle} title={collapsed ? "Expand navigation" : "Collapse navigation"}>
          {collapsed ? '›' : '‹ Collapse Sidebar'}
        </button>
      </div>
    </aside>
  );
}
