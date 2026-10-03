import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardStats, timelineEvents, alerts } from '../../data/mockData';
import RiskGauge from '../common/RiskGauge';
import { PackageIcon, BellIcon, ClockIcon, TargetIcon } from '../common/Icons';
import './Dashboard.css';

export default function Dashboard() {
  const [channelFilter, setChannelFilter] = useState('all');
  const navigate = useNavigate();

  const filteredEvents = channelFilter === 'all'
    ? timelineEvents
    : timelineEvents.filter(e => e.channel === channelFilter);

  const channelColor = (ch) => ch === 'offline' ? 'var(--channel-offline)' : ch === 'online' ? 'var(--channel-online)' : 'var(--channel-cross)';
  const severityBadge = (s) => `badge badge-${s}`;

  return (
    <div className="dashboard">
      {/* Stat Cards */}
      <div className="stat-cards-row">
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Assets Monitored</div>
            <div className="stat-value">{dashboardStats.totalAssets.toLocaleString()}</div>
            <div className="stat-trend text-low">↑ +0.8%</div>
          </div>
          <div className="stat-icon-wrapper">
            <PackageIcon size={18} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Active Alerts</div>
            <div className="stat-value text-critical">{dashboardStats.activeAlerts}</div>
            <span className="badge badge-critical" style={{ marginTop: 4 }}>HIGH PRIORITY</span>
          </div>
          <div className="stat-icon-wrapper">
            <BellIcon size={18} color="var(--risk-critical)" />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Avg Detection Time</div>
            <div className="stat-value">{dashboardStats.avgDetectionTime} <span style={{ fontSize: 14, fontWeight: 500 }}>min</span></div>
            <div className="stat-trend text-low">↓ -1.5 min</div>
          </div>
          <div className="stat-icon-wrapper">
            <ClockIcon size={18} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">False Positive Rate</div>
            <div className="stat-value">{dashboardStats.falsePositiveRate}%</div>
            <div className="stat-trend text-high">↑ +0.1%</div>
          </div>
          <div className="stat-icon-wrapper">
            <TargetIcon size={18} />
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="dashboard-grid">
        {/* Left: Timeline */}
        <div className="dashboard-col timeline-col">
          <div className="panel-header">
            <h3>Real-Time Threat Timeline</h3>
            <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)} className="filter-select">
              <option value="all">All Channels</option>
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div className="timeline-list">
            {filteredEvents.map((event, i) => (
              <div key={event.id} className="timeline-item animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot" style={{ background: channelColor(event.channel) }} />
                  {i < filteredEvents.length - 1 && <div className="timeline-line" />}
                </div>
                <div className="timeline-content">
                  <span className="text-mono text-caption">{event.timestamp}</span>
                  <div className="timeline-title">{event.title}</div>
                  <div className="text-caption">{event.subtitle}</div>
                  <div style={{ marginTop: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span className={`channel-badge channel-${event.channel}`}>{event.channel}</span>
                    <span className={`dot dot-${event.severity}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Map Placeholder */}
        <div className="dashboard-col map-col">
          <div className="panel-header">
            <h3>Custody Tracking</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/custody')}>Full Map →</button>
          </div>
          <div className="map-placeholder" onClick={() => navigate('/custody')}>
            <div className="map-grid">
              {/* Stylized mini map */}
              <svg viewBox="0 0 400 300" className="mini-map-svg">
                {/* Planned route */}
                <path d="M 50 250 Q 100 200, 150 180 T 250 100 T 350 50" stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeDasharray="6,4" opacity="0.5" />
                {/* Actual route */}
                <path d="M 50 250 Q 100 200, 150 180 T 220 150" stroke="var(--risk-low)" strokeWidth="3" fill="none" />
                {/* Deviation */}
                <path d="M 220 150 Q 200 120, 180 100 T 160 60" stroke="var(--risk-critical)" strokeWidth="3" fill="none" />
                {/* Deviation return */}
                <path d="M 160 60 Q 200 50, 250 100 T 350 50" stroke="var(--risk-low)" strokeWidth="2" fill="none" opacity="0.3" />
                {/* Markers */}
                <circle cx="50" cy="250" r="6" fill="var(--risk-low)" />
                <circle cx="150" cy="180" r="5" fill="var(--risk-low)" />
                <circle cx="180" cy="100" r="8" fill="var(--risk-critical)" />
                <circle cx="350" cy="50" r="6" fill="var(--text-tertiary)" />
                {/* Labels */}
                <text x="40" y="270" fill="var(--text-secondary)" fontSize="10">Press</text>
                <text x="160" y="90" fill="var(--risk-critical)" fontSize="10" fontWeight="700">ROUTE DEVIATION</text>
                <text x="330" y="40" fill="var(--text-secondary)" fontSize="10">Warehouse</text>
              </svg>
            </div>
            <div className="map-overlay-info">
              <div className="map-info-card">
                <span className="badge badge-critical">TAMPER DETECTED</span>
                <strong>BOX-7789</strong>
                <span className="text-caption">40km off planned route · Open 6 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Risk Score + Alert Queue */}
        <div className="dashboard-col alerts-col">
          {/* Risk Gauge */}
          <div className="risk-gauge-section">
            <RiskGauge score={90} size="lg" />
          </div>

          {/* Alert Queue */}
          <div className="panel-header" style={{ marginTop: 16 }}>
            <h3>Risk Queue</h3>
            <span className="text-caption">{alerts.length} alerts</span>
          </div>
          <div className="alert-queue">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`alert-card severity-${alert.severity}`}
                onClick={() => navigate(`/alerts/${alert.id}`)}
              >
                <div className="alert-card-header">
                  <span className="alert-card-title">{alert.title}</span>
                  <span className={severityBadge(alert.severity)}>{alert.severity}</span>
                </div>
                <p className="text-caption" style={{ margin: '6px 0' }}>{alert.description}</p>
                <div className="alert-card-footer">
                  <span className="text-caption">{alert.timeAgo}</span>
                  <span className="text-cyan" style={{ fontSize: 12, fontWeight: 600 }}>Review →</span>
                </div>
                {alert.isNew && <div className="alert-new-dot" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
