import { useState } from 'react';
import { custodyBoxes } from '../../data/mockData';
import './CustodyTracking.css';

export default function CustodyTracking() {
  const [selectedBox, setSelectedBox] = useState(custodyBoxes[0]);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredBoxes = custodyBoxes.filter(box => {
    if (filterStatus === 'ALL') return true;
    return box.status === filterStatus;
  });

  return (
    <div className="custody-page animate-fade-in">
      <div className="custody-header">
        <div>
          <h1 className="text-h1">Offline Custody & GPS Sentinel</h1>
          <p className="text-secondary">Smart custody box tracking, telemetry telemetry, lid accelerometer, and route deviation detection.</p>
        </div>
        <div className="custody-filters">
          {['ALL', 'IN_TRANSIT', 'STORAGE', 'BREACH_ALERT'].map(status => (
            <button
              key={status}
              className={`filter-tab ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="custody-grid">
        {/* Left Column: Custody Boxes List */}
        <div className="card box-list-card">
          <div className="card-header-bar">
            <h3 className="text-h3">Smart Custody Units</h3>
            <span className="text-mono text-caption">{filteredBoxes.length} Units Active</span>
          </div>
          <div className="box-list">
            {filteredBoxes.map(box => (
              <div
                key={box.id}
                className={`box-item ${selectedBox?.id === box.id ? 'selected' : ''}`}
                onClick={() => setSelectedBox(box)}
              >
                <div className="box-item-header">
                  <span className="box-id text-mono">{box.id}</span>
                  <span className={`badge badge-${box.status === 'BREACH_ALERT' ? 'critical' : box.status === 'IN_TRANSIT' ? 'info' : 'low'}`}>
                    {box.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="box-paper font-semibold">{box.paperName}</div>
                <div className="box-location text-caption">Location: {box.location}</div>
                <div className="box-meta text-mono">
                  <span>Battery: {box.battery}%</span>
                  <span>Temp: {box.temperature}°C</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Telemetry & Vector Route Map */}
        {selectedBox && (
          <div className="custody-detail">
            {/* Box Telemetry Banner */}
            <div className="card box-detail-banner">
              <div className="banner-main">
                <div>
                  <span className="text-mono text-tertiary">{selectedBox.id}</span>
                  <h2 className="text-h2" style={{ marginTop: 2 }}>{selectedBox.paperName}</h2>
                  <p className="text-secondary text-body-sm">
                    Courier: <strong>{selectedBox.courier}</strong> · Vehicle ID: <strong className="text-mono">{selectedBox.vehicleId}</strong>
                  </p>
                </div>
                <div>
                  <span className={`badge badge-${selectedBox.status === 'BREACH_ALERT' ? 'critical' : 'low'}`}>
                    {selectedBox.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="telemetry-grid">
                <div className="telemetry-card">
                  <span className="tel-label">GPS Speed</span>
                  <span className="tel-value text-mono">{selectedBox.speedKmH} km/h</span>
                </div>
                <div className="telemetry-card">
                  <span className="tel-label">Tamper Seal</span>
                  <span className={`tel-value text-mono ${selectedBox.tamperState === 'BREACH' ? 'text-critical' : 'text-low'}`}>
                    {selectedBox.tamperState}
                  </span>
                </div>
                <div className="telemetry-card">
                  <span className="tel-label">Temperature</span>
                  <span className="tel-value text-mono">{selectedBox.temperature}°C</span>
                </div>
                <div className="telemetry-card">
                  <span className="tel-label">Humidity</span>
                  <span className="tel-value text-mono">{selectedBox.humidity}%</span>
                </div>
                <div className="telemetry-card">
                  <span className="tel-label">Battery Level</span>
                  <span className="tel-value text-mono">{selectedBox.battery}%</span>
                </div>
              </div>
            </div>

            {/* Vector Route Map Visualizer */}
            <div className="card map-visual-card">
              <div className="card-header-bar">
                <h3 className="text-h3">Live Route Telemetry — {selectedBox.location}</h3>
                <span className="text-caption text-mono">Target ETA: {selectedBox.eta}</span>
              </div>
              <div className="live-map">
                <svg viewBox="0 0 600 220" className="map-svg">
                  {/* Planned Route Line */}
                  <line x1="60" y1="110" x2="540" y2="110" stroke="var(--border-strong)" strokeWidth="3" strokeDasharray="6 6" />
                  {/* Active Route Completed Line */}
                  <line x1="60" y1="110" x2="380" y2="110" stroke="var(--color-primary)" strokeWidth="3" />
                  
                  {/* Waypoint 1: Vault */}
                  <circle cx="60" cy="110" r="8" fill="var(--risk-low)" />
                  <text x="60" y="140" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">Printing Vault</text>

                  {/* Waypoint 2: Checkpoint */}
                  <circle cx="220" cy="110" r="7" fill="var(--color-primary)" />
                  <text x="220" y="140" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">Hub Checkpoint 2</text>

                  {/* Current Position Marker */}
                  <circle cx="380" cy="110" r="9" fill="var(--risk-critical)" />
                  <text x="380" y="140" fill="var(--risk-critical)" fontSize="11" fontWeight="600" textAnchor="middle">
                    Current Position
                  </text>

                  {/* Waypoint 3: Destination Center */}
                  <circle cx="540" cy="110" r="8" fill="var(--border-strong)" />
                  <text x="540" y="140" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">Exam Center #402</text>
                </svg>

                {selectedBox.status === 'BREACH_ALERT' && (
                  <div className="breach-alert-overlay">
                    <span className="badge badge-critical">SECURITY BREACH DETECTED</span>
                    <div className="breach-text">
                      <strong>Route Deviation (+4.2 km off designated GPS route)</strong>
                      <p className="text-caption">
                        Smart lid accelerometer triggered lid state motion at {selectedBox.lastUpdate}. Emergency vault locks engaged.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
