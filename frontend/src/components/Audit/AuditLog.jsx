import { useState } from 'react';
import { auditLog } from '../../data/mockData';
import './AuditLog.css';

export default function AuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState('ALL');

  const filteredLogs = auditLog.filter(item => {
    const matchesSearch = item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = channelFilter === 'ALL' || item.channel === channelFilter;
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="audit-page animate-fade-in">
      <div className="audit-header">
        <div>
          <h1 className="text-h1">Immutable Audit Trail</h1>
          <p className="text-secondary">Cryptographically signed system event journal for legal compliance and accountability.</p>
        </div>
        <div className="audit-compliance-badge">
          <span className="badge badge-low">Integrity Verified: SHA-256 Hash Chain Valid</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="card audit-controls">
        <input
          type="text"
          placeholder="Filter by action, user ID, or payload details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="audit-search-input"
        />
        <div className="audit-filter-buttons">
          {['ALL', 'OFFLINE', 'ONLINE', 'SYSTEM', 'HYBRID'].map(ch => (
            <button
              key={ch}
              className={`filter-btn ${channelFilter === ch ? 'active' : ''}`}
              onClick={() => setChannelFilter(ch)}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card table-card">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action Category</th>
              <th>Channel</th>
              <th>Actor / System</th>
              <th>Event Payload Details</th>
              <th>Cryptographic Hash (SHA-256)</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-tertiary" style={{ padding: 24 }}>
                  No audit trail records match the specified query.
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => (
                <tr key={log.id}>
                  <td className="text-mono text-caption">{log.timestamp}</td>
                  <td className="font-semibold">{log.action}</td>
                  <td>
                    <span className={`channel-badge channel-${log.channel.toLowerCase()}`}>
                      {log.channel}
                    </span>
                  </td>
                  <td className="text-body-sm text-secondary">{log.user}</td>
                  <td className="text-body-sm">{log.details}</td>
                  <td className="text-mono hash-cell" title={log.hash}>
                    {log.hash}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
