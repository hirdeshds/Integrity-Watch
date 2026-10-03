import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alerts } from '../../data/mockData';
import RiskGauge from '../common/RiskGauge';
import './AlertQueue.css';

export default function AlertQueue() {
  const navigate = useNavigate();
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = severityFilter === 'ALL' || alert.severity.toUpperCase() === severityFilter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.paperName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="alert-queue-page animate-fade-in">
      <div className="alert-queue-header">
        <div>
          <h1 className="text-h1">Alert Priority Queue</h1>
          <p className="text-secondary">Cross-channel correlated security anomalies prioritized by threat level and exam proximity.</p>
        </div>
        <div className="alert-count-pill">
          <span className="badge badge-critical">{alerts.filter(a => a.severity === 'critical').length} Critical</span>
          <span className="badge badge-high">{alerts.filter(a => a.severity === 'high').length} High</span>
          <span className="badge badge-medium">{alerts.filter(a => a.severity === 'medium').length} Medium</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="card queue-controls">
        <input
          type="text"
          placeholder="Filter by title, paper ID, or reference number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="queue-search"
        />
        <div className="severity-tabs">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
            <button
              key={sev}
              className={`sev-tab ${severityFilter === sev ? 'active' : ''}`}
              onClick={() => setSeverityFilter(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="queue-list">
        {filteredAlerts.length === 0 ? (
          <div className="card empty-state">
            <p className="text-secondary">No active alerts match the selected search criteria.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`card alert-row severity-${alert.severity}`}
              onClick={() => navigate(`/alerts/${alert.id}`)}
            >
              <div className="alert-row-left">
                <div className="alert-meta-top">
                  <span className={`badge badge-${alert.severity}`}>{alert.severity}</span>
                  <span className="text-mono alert-id">{alert.id}</span>
                  {alert.isNew && <span className="badge badge-info">UNREAD</span>}
                  <span className="badge badge-purple">{alert.channelType || 'HYBRID'}</span>
                </div>
                <h3 className="alert-title">{alert.title}</h3>
                <p className="alert-desc text-secondary">{alert.description}</p>
                <div className="alert-meta-bottom">
                  <span>File: <strong>{alert.paperName}</strong></span>
                  <span>Detected: {alert.timeAgo}</span>
                  <span>Exam in <strong>{alert.examCountdown} days</strong></span>
                  <span>Target Zone: {alert.targetLocations?.join(', ') || 'Multi-zone'}</span>
                </div>
              </div>
              <div className="alert-row-right">
                <RiskGauge score={alert.riskScore} size="sm" />
                <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}>
                  Investigate →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
