import { useState } from 'react';
import { collusionGraph } from '../../data/mockData';
import './CollusionGraph.css';

const positions = {
  EMP_4521: { x: 400, y: 250 }, DOC_PHYS: { x: 550, y: 180 },
  EMP_4393: { x: 350, y: 150 }, MGR_1092: { x: 500, y: 340 },
  EMP_3892: { x: 680, y: 120 }, EMP_1093: { x: 750, y: 200 },
  EMP_7320: { x: 600, y: 400 }, ANL_8830: { x: 250, y: 350 },
};

export default function CollusionGraphView() {
  const [selected, setSelected] = useState(collusionGraph.nodes[0]);
  const [hoveredPattern, setHoveredPattern] = useState(null);

  const highlightNodes = hoveredPattern ? collusionGraph.patterns.find(p => p.id === hoveredPattern)?.nodes || [] : [];

  const getNodeColor = (node) => {
    if (node.suspicious) return 'var(--risk-critical)';
    if (node.type === 'document') return 'var(--risk-medium)';
    return 'var(--color-primary)';
  };

  return (
    <div className="collusion-page animate-fade-in">
      <div className="graph-header">
        <div>
          <h1 className="text-h1">Collusion & Co-Location Matrix</h1>
          <p className="text-secondary">Cross-channel entity relationship graph detecting coordinated access and badge proximity clusters.</p>
        </div>
        <div className="graph-header-meta">
          <span className="badge badge-critical">1 Suspected Collusion Cluster</span>
          <span className="text-mono text-caption">{collusionGraph.nodes.length} Nodes · {collusionGraph.edges.length} Connections</span>
        </div>
      </div>

      <div className="graph-layout">
        {/* Graph Canvas */}
        <div className="graph-canvas card">
          <div className="canvas-toolbar text-caption text-secondary">
            <span>Visualizing: Active Threat Actor Cluster (Physics Paper Access Window)</span>
          </div>
          <svg viewBox="0 0 900 480" className="graph-svg">
            {/* Cluster boundary */}
            <path
              d="M 320 120 L 580 140 L 540 370 L 310 290 Z"
              fill="rgba(239, 68, 68, 0.05)"
              stroke="var(--risk-critical)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Edges */}
            {collusionGraph.edges.map((edge, i) => {
              const s = positions[edge.source];
              const t = positions[edge.target];
              if (!s || !t) return null;
              return (
                <g key={i}>
                  <line
                    x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                    stroke={edge.suspicious ? 'var(--risk-critical)' : 'var(--border-strong)'}
                    strokeWidth={edge.suspicious ? 2 : 1}
                    strokeDasharray={edge.suspicious ? '3 3' : 'none'}
                  />
                  <text
                    x={(s.x + t.x) / 2}
                    y={(s.y + t.y) / 2 - 4}
                    fill="var(--text-tertiary)"
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    textAnchor="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {collusionGraph.nodes.map(node => {
              const pos = positions[node.id];
              if (!pos) return null;
              const isHighlighted = highlightNodes.includes(node.id);
              const color = getNodeColor(node);
              const isSelected = selected?.id === node.id;

              return (
                <g
                  key={node.id}
                  className={`graph-node ${isHighlighted ? 'highlighted' : ''}`}
                  onClick={() => setSelected(node)}
                  style={{ cursor: 'pointer' }}
                >
                  {node.type === 'document' ? (
                    <rect
                      x={pos.x - 16} y={pos.y - 16} width="32" height="32" rx="4"
                      fill="var(--bg-surface)"
                      stroke={color}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                  ) : (
                    <circle
                      cx={pos.x} cy={pos.y} r="16"
                      fill="var(--bg-surface)"
                      stroke={color}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                  )}
                  <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="600">
                    {node.type === 'document' ? 'DOC' : 'USR'}
                  </text>
                  <text x={pos.x} y={pos.y + 30} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontWeight="500">
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side Detail Panel */}
        <div className="graph-panel">
          <div className="card pattern-card">
            <h3 className="text-h3" style={{ marginBottom: 12 }}>Detected Collusion Patterns</h3>
            {collusionGraph.patterns.map(p => (
              <div
                key={p.id}
                className="pattern-item"
                onMouseEnter={() => setHoveredPattern(p.id)}
                onMouseLeave={() => setHoveredPattern(null)}
              >
                <div className="pattern-desc">
                  <span className="dot dot-critical" />
                  <span className="text-body-sm">{p.description}</span>
                </div>
                <span className={`badge badge-${p.confidence === 'high' ? 'critical' : 'medium'}`}>
                  {p.confidence}
                </span>
              </div>
            ))}
          </div>

          {selected && (
            <div className="card node-detail-card">
              <h3 className="text-h3" style={{ marginBottom: 12 }}>Entity Properties</h3>
              <div className="property-list">
                <div className="prop-row">
                  <span className="text-caption">Identifier</span>
                  <span className="text-mono">{selected.id}</span>
                </div>
                <div className="prop-row">
                  <span className="text-caption">Label</span>
                  <span className="font-semibold">{selected.label}</span>
                </div>
                <div className="prop-row">
                  <span className="text-caption">Entity Type</span>
                  <span className="badge badge-info">{selected.type.toUpperCase()}</span>
                </div>
                <div className="prop-row">
                  <span className="text-caption">Assigned Dept</span>
                  <span className="text-body-sm">{selected.dept || 'Repository Vault'}</span>
                </div>
                <div className="prop-row">
                  <span className="text-caption">Risk Score</span>
                  <span className={`text-mono font-bold ${selected.riskScore > 60 ? 'text-critical' : 'text-low'}`}>
                    {selected.riskScore} / 100
                  </span>
                </div>
                {selected.suspicious && (
                  <div style={{ marginTop: 8 }}>
                    <span className="badge badge-critical">FLAGGED IN THREAT PATTERN PAT-01</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
