import { useParams, useNavigate } from 'react';
import { alerts, timelineEvents } from '../../data/mockData';
import RiskGauge from '../common/RiskGauge';
import { LockIcon, CheckIcon, ShieldIcon } from '../common/Icons';
import './AlertDetail.css';

export default function AlertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = alerts.find(a => a.id === id) || alerts[0];
  const relatedEvents = id === 'ALT-001' ? timelineEvents : [];
  const maxPoints = Math.max(...alert.scoreBreakdown.map(s => s.points));

  return (
    <div className="alert-detail animate-fade-in">
      {/* Top Header */}
      <div className="alert-header-bar">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/alerts')}>
          ← Back to Queue
        </button>
        <div className={`card alert-banner severity-${alert.severity}`}>
          <div className="banner-info">
            <div className="banner-badges">
              <span className={`badge badge-${alert.severity}`}>{alert.severity} THREAT</span>
              <span className="text-mono text-tertiary">{alert.id}</span>
              <span className="badge badge-purple">{alert.channelType || 'HYBRID'}</span>
            </div>
            <h1 className="text-h1" style={{ marginTop: 4 }}>{alert.title}</h1>
            <div className="banner-sub text-secondary">
              Target File: <strong>{alert.paperName}</strong> · Detected: {alert.timeAgo} · Exam Countdown: <strong>{alert.examCountdown} Days</strong>
            </div>
          </div>
          <RiskGauge score={alert.riskScore} size="md" />
        </div>
      </div>

      {/* AI Explanation & Analysis Summary */}
      <div className="card analysis-section">
        <div className="analysis-header">
          <h2 className="text-h3">Correlation Analysis & Rationale</h2>
          <span className="badge badge-info">Model Confidence: 94.2%</span>
        </div>
        <p className="analysis-text">{alert.aiExplanation}</p>
      </div>

      {/* 3-Column Detail Grid */}
      <div className="detail-grid">
        {/* Column 1: Chronological Event Sequence */}
        <div className="card detail-panel">
          <div className="panel-title-bar">
            <h3 className="text-h3">Correlated Audit Chain</h3>
            <span className="text-caption">{relatedEvents.length} Events</span>
          </div>
          {relatedEvents.length > 0 ? (
            <div className="detail-timeline">
              {relatedEvents.map((evt, i) => (
                <div key={evt.id} className="dt-item">
                  <div className="dt-dot-col">
                    <div className="dt-dot" style={{ background: evt.channel === 'offline' ? 'var(--channel-offline)' : 'var(--channel-online)' }} />
                    {i < relatedEvents.length - 1 && <div className="dt-line" />}
                  </div>
                  <div className="dt-content">
                    <div className="dt-header">
                      <span className="text-mono text-caption">{evt.timestamp}</span>
                      <span className={`channel-badge channel-${evt.channel}`}>{evt.channel}</span>
                    </div>
                    <strong className="dt-title">{evt.title}</strong>
                    <p className="text-caption">{evt.subtitle}</p>
                    <span className="text-mono text-caption text-tertiary" style={{ display: 'block', marginTop: 2 }}>
                      Source: {evt.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary text-caption" style={{ padding: '16px 0' }}>
              No secondary cross-channel events detected for this alert record.
            </p>
          )}
        </div>

        {/* Column 2: SHAP Risk Feature Attribution */}
        <div className="card detail-panel">
          <div className="panel-title-bar">
            <h3 className="text-h3">Risk Feature Attribution</h3>
            <span className="text-caption">SHAP Score Matrix</span>
          </div>
          <p className="text-caption" style={{ marginBottom: 16 }}>
            Mathematical feature contribution to total risk score ({alert.riskScore}/100):
          </p>
          <div className="score-bars">
            {alert.scoreBreakdown.map((item) => (
              <div key={item.component} className="score-bar-row">
                <div className="bar-header">
                  <span className="score-bar-label">{item.component}</span>
                  <span className="score-bar-value" style={{ color: item.color }}>+{item.points} pts</span>
                </div>
                <div className="score-bar-track">
                  <div
                    className="score-bar-fill"
                    style={{ width: `${(item.points / maxPoints) * 100}%`, background: item.color }}
                  />
                </div>
                <span className="text-caption bar-reason">{item.reason}</span>
              </div>
            ))}
            <div className="score-total">
              <span>Cumulative Risk Score</span>
              <strong className="text-mono text-h3">+{alert.riskScore}</strong>
            </div>
          </div>
        </div>

        {/* Column 3: Mitigation Protocol & Dual Sign-off */}
        <div className="card detail-panel">
          <div className="panel-title-bar">
            <h3 className="text-h3">Incident Mitigation</h3>
            <span className="badge badge-info">Action Required</span>
          </div>
          <div className="action-list">
            {alert.actions.map(action => (
              <label key={action.id} className={`action-item priority-${action.priority}`}>
                <input type="checkbox" defaultChecked={action.priority === 'high'} />
                <div className="action-info">
                  <strong>{action.label}</strong>
                  <span className="text-caption">{action.description}</span>
                </div>
              </label>
            ))}
          </div>

          {alert.dualApproval.required && (
            <div className="dual-approval-panel">
              <div className="dual-header font-semibold" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <LockIcon size={14} color="var(--risk-critical)" /> Dual-Authorization Required
              </div>
              <p className="text-caption" style={{ marginBottom: 12 }}>
                High-severity actions require multi-party cryptographic sign-off before execution.
              </p>
              <div className="reviewer-slots">
                <div className="reviewer-slot approved">
                  <span className="slot-status"><CheckIcon size={14} /></span>
                  <div>
                    <strong>{alert.dualApproval.reviewer1.name}</strong>
                    <span className="text-caption">Sign-off recorded · {alert.dualApproval.reviewer1.timeAgo}</span>
                  </div>
                </div>
                <div className="reviewer-slot pending">
                  <span className="slot-status pending-icon">⌛</span>
                  <div>
                    <strong>Secondary Reviewer (Mehak)</strong>
                    <span className="text-caption">Awaiting sign-off...</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 12, width: '100%' }}>
                Authorize Mitigation Plan
              </button>
            </div>
          )}
          <div className="protocol-note text-caption" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldIcon size={14} color="var(--text-tertiary)" />
            <span>All authorization decisions are permanently logged to the immutable audit trail.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
