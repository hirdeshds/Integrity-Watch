import { riskTrend, activityHeatmap, modelPerformance, upcomingExams } from '../../data/mockData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { PackageIcon, BellIcon, ClockIcon, TargetIcon } from '../common/Icons';
import './Analytics.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="chart-tooltip">
        <span className="text-mono">{payload[0].payload.hour}</span>
        <strong className="text-mono">Risk Index: {payload[0].value}</strong>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="analytics animate-fade-in">
      <div className="analytics-header">
        <div>
          <h1 className="text-h1">Analytics & System Health</h1>
          <p className="text-secondary">24-hour threat index trends, activity heatmaps, and MLOps model validation metrics.</p>
        </div>
        <div className="model-status-badge">
          <span className="badge badge-low">Model Version {modelPerformance.version} Active</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="stat-cards-row" style={{ marginTop: 16, marginBottom: 16 }}>
        <div className="stat-card">
          <div>
            <div className="stat-label">Total Assets Monitored</div>
            <div className="stat-value">1,247</div>
            <div className="stat-trend text-low">↑ +0.8% change</div>
          </div>
          <div className="stat-icon-wrapper">
            <PackageIcon size={18} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Active Alerts</div>
            <div className="stat-value text-critical">12</div>
            <span className="badge badge-critical" style={{ marginTop: 4 }}>HIGH PRIORITY</span>
          </div>
          <div className="stat-icon-wrapper">
            <BellIcon size={18} color="var(--risk-critical)" />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">Avg Detection Window</div>
            <div className="stat-value">4.2 <span style={{ fontSize: 14 }}>min</span></div>
            <div className="stat-trend text-low">↓ -1.5 min window</div>
          </div>
          <div className="stat-icon-wrapper">
            <ClockIcon size={18} />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-label">False Positive Rate</div>
            <div className="stat-value">3.2%</div>
            <div className="stat-trend text-high">↑ +0.1% drift</div>
          </div>
          <div className="stat-icon-wrapper">
            <TargetIcon size={18} />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="text-h3">Cumulative Threat Index (24h Window)</h3>
            <span className="text-caption">Hourly Isolation Forest Score</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={riskTrend}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} tickLine={false} interval={3} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="url(#colorScore)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="text-h3">Weekly Access Heatmap</h3>
            <span className="text-caption">Density of Off-Hours Access</span>
          </div>
          <div className="heatmap-grid">
            <div className="heatmap-labels">
              {days.map(d => <span key={d} className="heatmap-day">{d}</span>)}
            </div>
            <div className="heatmap-cells">
              {days.map(day => (
                <div key={day} className="heatmap-row">
                  {Array.from({ length: 24 }, (_, h) => {
                    const cell = activityHeatmap.find(c => c.day === day && c.hour === h);
                    const intensity = cell ? Math.min(cell.count / 45, 1) : 0;
                    const bg = cell?.isAnomalous
                      ? `rgba(239, 68, 68, ${0.3 + intensity * 0.5})`
                      : `rgba(59, 130, 246, ${intensity * 0.4})`;
                    return <div key={h} className="heatmap-cell" style={{ background: bg }} title={`${day} ${h}:00 — ${cell?.count || 0} events`} />;
                  })}
                </div>
              ))}
              <div className="heatmap-hours">
                {[0, 4, 8, 12, 16, 20].map(h => <span key={h} className="text-mono" style={{ fontSize: 9, color: 'var(--text-tertiary)' }}>{String(h).padStart(2, '0')}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Performance & Exams Row */}
      <div className="charts-row" style={{ marginTop: 16 }}>
        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="text-h3">Upcoming Exam Custody Schedule</h3>
            <span className="text-caption">Target Proximity</span>
          </div>
          <div className="exam-list">
            {upcomingExams.map(exam => (
              <div key={exam.id} className="exam-row">
                <span className="text-mono text-tertiary">{exam.id}</span>
                <span className="exam-name font-semibold">{exam.name}</span>
                <span className="text-caption">{exam.date}</span>
                <span className="badge badge-info">{exam.countdown}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card chart-card">
          <div className="chart-header">
            <h3 className="text-h3">ML Model Validation ({modelPerformance.version})</h3>
            <span className="text-caption">Retrained: {modelPerformance.lastRetrained}</span>
          </div>
          <div className="model-gauges">
            {[
              { label: 'Recall', val: modelPerformance.recall },
              { label: 'Precision', val: modelPerformance.precision },
              { label: 'F1-Score', val: modelPerformance.f1Score }
            ].map(m => (
              <div key={m.label} className="model-metric-item">
                <span className="text-caption">{m.label}</span>
                <span className="metric-val text-mono">{m.val}%</span>
              </div>
            ))}
          </div>
          <div className="confusion-matrix">
            <div className="cm-cell cm-tp">True Positives<br /><strong className="text-mono">{modelPerformance.confusionMatrix.tp}</strong></div>
            <div className="cm-cell cm-fp">False Positives<br /><strong className="text-mono">{modelPerformance.confusionMatrix.fp}</strong></div>
            <div className="cm-cell cm-fn">False Negatives<br /><strong className="text-mono">{modelPerformance.confusionMatrix.fn}</strong></div>
            <div className="cm-cell cm-tn">True Negatives<br /><strong className="text-mono">{modelPerformance.confusionMatrix.tn}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
