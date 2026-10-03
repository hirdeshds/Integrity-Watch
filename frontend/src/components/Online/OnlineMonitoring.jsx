import { useState } from 'react';
import './OnlineMonitoring.css';

const activityLogs = [
  { id: 'ACT-901', timestamp: '11:55 PM', user: 'Employee_4521', role: 'Chemistry Reviewer', event: 'Screenshot Triggered', document: 'Physics_Paper_Final_v3.pdf', channel: 'DRM Agent', severity: 'critical', status: 'Flagged' },
  { id: 'ACT-902', timestamp: '11:54 PM', user: 'Employee_4521', role: 'Chemistry Reviewer', event: 'Document Downloaded', document: 'Physics_Paper_Final_v3.pdf', channel: 'Document Portal', severity: 'critical', status: 'Flagged' },
  { id: 'ACT-903', timestamp: '11:53 PM', user: 'Employee_4521', role: 'Chemistry Reviewer', event: 'Wrong Subject Access', document: 'Physics_Paper_Final_v3.pdf', channel: 'Document Portal', severity: 'high', status: 'Flagged' },
  { id: 'ACT-904', timestamp: '11:53 PM', user: 'Employee_4521', role: 'Chemistry Reviewer', event: 'Off-Hours Authentication', document: 'Auth Gateway', channel: 'IDP SSO', severity: 'high', status: 'Flagged' },
  { id: 'ACT-905', timestamp: '11:40 PM', user: 'Employee_4393', role: 'Senior Physics Reviewer', event: 'Document Read', document: 'Physics_Paper_Final_v3.pdf', channel: 'Document Portal', severity: 'low', status: 'Normal' },
  { id: 'ACT-906', timestamp: '10:38 PM', user: 'Employee_1092', role: 'Data Entry', event: 'Repeated Document Access (4x)', document: 'Chemistry_Paper_v2.pdf', channel: 'Document Portal', severity: 'high', status: 'Flagged' },
  { id: 'ACT-907', timestamp: '09:15 PM', user: 'Employee_3892', role: 'Physics Reviewer', event: 'Normal Document Read', document: 'Physics_Paper_Final_v3.pdf', channel: 'Document Portal', severity: 'low', status: 'Normal' },
  { id: 'ACT-908', timestamp: '07:00 PM', user: 'Employee_7320', role: 'Logistics', event: 'Unrecognized Device Login', document: 'Auth Gateway', channel: 'IDP SSO', severity: 'low', status: 'Under Review' },
];

const baselineComparison = {
  user: 'Employee_4521',
  role: 'Chemistry Reviewer',
  normalHours: '09:00 AM - 05:00 PM (Mon-Fri)',
  actualHours: '11:53 PM (Off-hours)',
  normalSubjects: ['Chemistry_Paper_v2.pdf', 'Organic_Chem_Guide.pdf'],
  accessedSubject: 'Physics_Paper_Final_v3.pdf (Wrong Dept)',
  avgDailyDownloads: 0.2,
  actualDownloadsToday: 1.0,
  screenshotHistory: 0,
  actualScreenshotsToday: 1,
};

const documentHeatmap = [
  { user: 'Employee_4521', physics: 8, chemistry: 1, maths: 0, biology: 0 },
  { user: 'Employee_4393', physics: 12, chemistry: 0, maths: 1, biology: 0 },
  { user: 'Employee_1092', physics: 0, chemistry: 15, maths: 0, biology: 0 },
  { user: 'Employee_3892', physics: 5, chemistry: 0, maths: 0, biology: 0 },
  { user: 'Employee_7320', physics: 1, chemistry: 1, maths: 0, biology: 0 },
];

export default function OnlineMonitoring() {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBaselineModal, setShowBaselineModal] = useState(false);

  const filteredLogs = activityLogs.filter(log => {
    const matchesSev = filterSeverity === 'ALL' || log.severity.toUpperCase() === filterSeverity;
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.document.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <div className="online-page animate-fade-in">
      <div className="online-header">
        <div>
          <h1 className="text-h1">Online Activity Sentinel</h1>
          <p className="text-secondary">Continuous monitoring of document portal access, DRM endpoint events, and behavioral baseline anomalies.</p>
        </div>
        <div className="online-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => setShowBaselineModal(true)}>
            📊 View User Behavioral Baseline
          </button>
        </div>
      </div>

      {/* Behavioral Baseline Modal */}
      {showBaselineModal && (
        <div className="modal-backdrop" onClick={() => setShowBaselineModal(false)}>
          <div className="modal-card card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-h3">Behavioral Baseline vs. Current Activity Analysis</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowBaselineModal(false)}>✕</button>
            </div>
            <div className="baseline-grid">
              <div className="baseline-col">
                <h4 className="text-caption text-tertiary">EXPECTED BEHAVIORAL BASELINE</h4>
                <div className="baseline-item">
                  <span className="text-caption">User & Role:</span>
                  <strong>{baselineComparison.user} ({baselineComparison.role})</strong>
                </div>
                <div className="baseline-item">
                  <span className="text-caption">Authorized Access Window:</span>
                  <span>{baselineComparison.normalHours}</span>
                </div>
                <div className="baseline-item">
                  <span className="text-caption">Authorized Subject Scope:</span>
                  <span>{baselineComparison.normalSubjects.join(', ')}</span>
                </div>
                <div className="baseline-item">
                  <span className="text-caption">Avg Daily Downloads:</span>
                  <span className="text-mono">{baselineComparison.avgDailyDownloads} files/day</span>
                </div>
              </div>

              <div className="baseline-col anomaly-highlight">
                <h4 className="text-caption text-critical">ANOMALOUS ACTIVITY RECORDED</h4>
                <div className="baseline-item">
                  <span className="text-caption">Actual Access Time:</span>
                  <strong className="text-critical">{baselineComparison.actualHours}</strong>
                </div>
                <div className="baseline-item">
                  <span className="text-caption">Accessed Subject:</span>
                  <strong className="text-critical">{baselineComparison.accessedSubject}</strong>
                </div>
                <div className="baseline-item">
                  <span className="text-caption">Downloads Today:</span>
                  <strong className="text-critical">{baselineComparison.actualDownloadsToday} (500% surge)</strong>
                </div>
                <div className="baseline-item">
                  <span className="text-caption">DRM Screenshot Events:</span>
                  <strong className="text-critical">{baselineComparison.actualScreenshotsToday} Event (First in 180 days)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Heatmap Section */}
      <div className="card heatmap-section">
        <div className="card-header-bar">
          <h3 className="text-h3">Document Access Intensity Matrix</h3>
          <span className="text-caption">Access Count by User & Subject</span>
        </div>
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Personnel / Role</th>
              <th>Physics Papers</th>
              <th>Chemistry Papers</th>
              <th>Maths Papers</th>
              <th>Biology Papers</th>
            </tr>
          </thead>
          <tbody>
            {documentHeatmap.map(row => (
              <tr key={row.user}>
                <td className="font-semibold">{row.user}</td>
                <td className={row.physics > 5 ? 'cell-high-risk' : ''}>{row.physics} accesses</td>
                <td className={row.chemistry > 10 ? 'cell-med-risk' : ''}>{row.chemistry} accesses</td>
                <td>{row.maths} accesses</td>
                <td>{row.biology} accesses</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity Logs Table */}
      <div className="card table-card">
        <div className="card-header-controls">
          <input
            type="text"
            placeholder="Search by user, document, or event type..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="severity-tabs">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
              <button
                key={sev}
                className={`sev-tab ${filterSeverity === sev ? 'active' : ''}`}
                onClick={() => setFilterSeverity(sev)}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <table className="audit-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Event Action</th>
              <th>Document Target</th>
              <th>Data Channel</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td className="text-mono text-caption">{log.timestamp}</td>
                <td className="font-semibold">{log.user}</td>
                <td>{log.event}</td>
                <td className="text-mono text-body-sm">{log.document}</td>
                <td>
                  <span className="channel-badge channel-online">{log.channel}</span>
                </td>
                <td>
                  <span className={`badge badge-${log.severity}`}>{log.severity}</span>
                </td>
                <td className="text-caption">{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
