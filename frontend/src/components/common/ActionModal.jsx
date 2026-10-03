import { useState } from 'react';
import './ActionModal.css';

export default function ActionModal({ isOpen, onClose, onSubmit, title, actionType, targetName }) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Mandatory justification reason is required before executing action.');
      return;
    }
    onSubmit({ actionType, reason, timestamp: new Date().toLocaleTimeString() });
    setReason('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-h3">{title || `Confirm Action: ${actionType}`}</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="action-modal-body">
          <div className="target-info">
            <span className="text-caption">Target Object / Entity:</span>
            <strong>{targetName}</strong>
          </div>
          <p className="text-caption text-secondary" style={{ marginTop: 8 }}>
            Human-in-the-Loop Protocol: Every action requires an explicit, audited justification before execution.
          </p>

          <div className="form-group" style={{ marginTop: 12 }}>
            <label className="text-caption font-semibold">Mandatory Reason / Justification:</label>
            <textarea
              rows={3}
              placeholder="Provide explicit operational rationale for this decision..."
              value={reason}
              onChange={e => { setReason(e.target.value); setError(''); }}
              className="reason-textarea"
            />
            {error && <span className="text-critical text-caption">{error}</span>}
          </div>

          <div className="modal-footer" style={{ marginTop: 16 }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-sm ${actionType === 'Dismiss' ? 'btn-secondary' : actionType === 'Escalate' ? 'btn-destructive' : 'btn-primary'}`}
            >
              Confirm & Record Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
