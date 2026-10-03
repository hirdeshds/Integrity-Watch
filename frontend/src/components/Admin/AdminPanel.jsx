import { useState } from 'react';
import './AdminPanel.css';

const initialUsers = [
  { id: 'USR-01', name: 'Mehak', role: 'Investigator', dept: 'SOC Team', status: 'Active', lastLogin: '10 min ago', mfa: true },
  { id: 'USR-02', name: 'Investigator_B', role: 'Investigator', dept: 'SOC Team', status: 'Active', lastLogin: '2 hours ago', mfa: true },
  { id: 'USR-03', name: 'Admin_001', role: 'Admin', dept: 'IT Sec', status: 'Active', lastLogin: '1 hour ago', mfa: true },
  { id: 'USR-04', name: 'Auditor_Compliance', role: 'Auditor', dept: 'Legal', status: 'Active', lastLogin: '1 day ago', mfa: true },
  { id: 'USR-05', name: 'Viewer_Guest', role: 'Viewer', dept: 'Observer', status: 'Inactive', lastLogin: '5 days ago', mfa: false },
];

const integrations = [
  { name: 'Offline Custody Smart Box Telemetry', type: 'IoT Telemetry Feed', status: 'Connected', ping: '12ms', lastSync: '1 min ago' },
  { name: 'Central Auth Gateway (IDP SSO)', type: 'Authentication Log Feed', status: 'Connected', ping: '4ms', lastSync: 'Just now' },
  { name: 'Document Portal DRM Endpoint Agent', type: 'DRM Event Feed', status: 'Connected', ping: '8ms', lastSync: 'Just now' },
  { name: 'Vault Facility Access Control', type: 'Physical RFID Badge Feed', status: 'Connected', ping: '15ms', lastSync: '2 min ago' },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [threshold, setThreshold] = useState(80);
  const [activeModel, setActiveModel] = useState('v2.4');

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-header">
        <div>
          <h1 className="text-h1">Admin Control Center</h1>
          <p className="text-secondary">Role-based access control, system threshold configuration, detection model management, and integration feeds.</p>
        </div>
        <div className="admin-tabs">
          {['users', 'config', 'models', 'integrations'].map(tab => (
            <button
              key={tab}
              className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: RBAC User Management */}
      {activeTab === 'users' && (
        <div className="card table-card">
          <div className="card-header-bar">
            <h3 className="text-h3">Personnel Access & Role Management (RBAC)</h3>
            <button className="btn btn-primary btn-sm">+ Add User</button>
          </div>
          <table className="audit-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Assigned Role</th>
                <th>Department</th>
                <th>MFA Status</th>
                <th>Account Status</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialUsers.map(user => (
                <tr key={user.id}>
                  <td className="text-mono text-caption">{user.id}</td>
                  <td className="font-semibold">{user.name}</td>
                  <td>
                    <span className={`badge badge-${user.role === 'Admin' ? 'critical' : user.role === 'Investigator' ? 'info' : 'purple'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="text-secondary">{user.dept}</td>
                  <td>
                    <span className={`badge badge-${user.mfa ? 'low' : 'medium'}`}>
                      {user.mfa ? 'MFA ACTIVE' : 'MFA PENDING'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${user.status === 'Active' ? 'low' : 'high'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="text-caption">{user.lastLogin}</td>
                  <td>
                    <button className="btn btn-ghost btn-sm">Edit Role</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: System Configuration */}
      {activeTab === 'config' && (
        <div className="config-grid">
          <div className="card config-card">
            <h3 className="text-h3" style={{ marginBottom: 12 }}>Critical Alert Threshold Settings</h3>
            <p className="text-caption text-secondary" style={{ marginBottom: 16 }}>
              Set minimum score required to trigger Critical Severity alert and mandate Dual-Approval workflow.
            </p>
            <div className="slider-row">
              <span className="text-caption">Score Threshold:</span>
              <input
                type="range"
                min="50"
                max="95"
                value={threshold}
                onChange={e => setThreshold(Number(e.target.value))}
                style={{ flex: 1 }}
              />
              <span className="text-mono font-bold text-critical" style={{ fontSize: 16 }}>{threshold} / 100</span>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="btn btn-primary btn-sm">Save Threshold Settings</button>
            </div>
          </div>

          <div className="card config-card">
            <h3 className="text-h3" style={{ marginBottom: 12 }}>Alert SLA & Automatic Routing</h3>
            <div className="form-group">
              <label className="text-caption">Critical Alert SLA Review Timeout:</label>
              <select className="select-input">
                <option>30 Minutes</option>
                <option selected>60 Minutes (Default)</option>
                <option>120 Minutes</option>
              </select>
            </div>
            <div className="form-group" style={{ marginTop: 12 }}>
              <label className="text-caption">Default Alert Routing Group:</label>
              <select className="select-input">
                <option selected>Senior SOC Investigation Team</option>
                <option>Duty Officer Escalation Desk</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Model Version Management */}
      {activeTab === 'models' && (
        <div className="card model-card">
          <h3 className="text-h3" style={{ marginBottom: 12 }}>Detection Engine Model Versions</h3>
          <table className="audit-table">
            <thead>
              <tr>
                <th>Model Version</th>
                <th>Algorithm</th>
                <th>Training Window</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold text-mono">v2.4 (Current)</td>
                <td>Isolation Forest + Cross-Channel Correlation</td>
                <td>Past 180 Days Baseline</td>
                <td className="text-mono">95.1%</td>
                <td className="text-mono">96.8%</td>
                <td><span className="badge badge-low">ACTIVE PRODUCTION</span></td>
                <td><button className="btn btn-secondary btn-sm" disabled>Active</button></td>
              </tr>
              <tr>
                <td className="font-semibold text-mono">v2.3</td>
                <td>Isolation Forest Baseline</td>
                <td>Past 120 Days Baseline</td>
                <td className="text-mono">92.4%</td>
                <td className="text-mono">94.1%</td>
                <td><span className="badge badge-info">ARCHIVED</span></td>
                <td><button className="btn btn-ghost btn-sm" onClick={() => setActiveModel('v2.3')}>Rollback</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Connected Integrations */}
      {activeTab === 'integrations' && (
        <div className="card table-card">
          <h3 className="text-h3" style={{ padding: '16px 16px 8px 16px' }}>Connected Data Feeds & External Sources</h3>
          <table className="audit-table">
            <thead>
              <tr>
                <th>Source Name</th>
                <th>Feed Type</th>
                <th>Connection Status</th>
                <th>Latency</th>
                <th>Last Synchronized</th>
              </tr>
            </thead>
            <tbody>
              {integrations.map(item => (
                <tr key={item.name}>
                  <td className="font-semibold">{item.name}</td>
                  <td className="text-secondary">{item.type}</td>
                  <td><span className="badge badge-low">{item.status}</span></td>
                  <td className="text-mono text-caption">{item.ping}</td>
                  <td className="text-caption">{item.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
