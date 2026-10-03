import './HelpModal.css';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-h3">PrahariAI System Documentation & Guidance</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <div className="help-body">
          <section className="help-section">
            <h4>Risk Score Calculation (0 – 100)</h4>
            <p className="text-body-sm text-secondary">
              Risk scores are computed using an unsupervised Isolation Forest model trained on 180 days of baseline physical custody telemetry and digital DRM access logs.
            </p>
            <ul className="help-list text-caption">
              <li><strong className="text-critical">Critical Risk (80 – 100):</strong> Cross-channel correlation (offline custody breach + online document access/download/screenshot within 15 minutes). Requires Dual-Approval sign-off.</li>
              <li><strong className="text-high">High Risk (60 – 79):</strong> Severe single-channel anomaly (e.g., repeated off-hours document downloads by non-subject reviewer).</li>
              <li><strong className="text-medium">Medium Risk (40 – 59):</strong> Transport stop or route deviation without tamper detection.</li>
              <li><strong className="text-low">Low Risk (0 – 39):</strong> Baseline activity, unrecognized device login without document access.</li>
            </ul>
          </section>

          <section className="help-section">
            <h4>Human-in-the-Loop Protocol</h4>
            <p className="text-body-sm text-secondary">
              PrahariAI never performs automated blocking or disciplinary punishment. Every mitigation action (backup paper activation, access revocation) requires explicit human confirmation and recorded justification.
            </p>
          </section>

          <section className="help-section">
            <h4>SOC Technical Escalation</h4>
            <p className="text-body-sm text-secondary">
              For system integration failures or telemetry sync issues, contact duty SOC Lead at <strong className="text-mono">soc-lead@prahari.ai</strong> or ext <strong className="text-mono">#4491</strong>.
            </p>
          </section>
        </div>
        <div className="modal-footer" style={{ marginTop: 16 }}>
          <button className="btn btn-primary btn-sm" onClick={onClose}>Close Help</button>
        </div>
      </div>
    </div>
  );
}
