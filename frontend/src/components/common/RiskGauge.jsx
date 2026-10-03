import { useEffect, useState } from 'react';
import './RiskGauge.css';

export default function RiskGauge({ score = 0, size = 'lg' }) {
  const [animatedScore, setAnimatedScore] = useState(score);

  useEffect(() => {
    let start = 0;
    const duration = 600;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setAnimatedScore(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [score]);

  const severity = score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 40 ? 'medium' : 'low';
  const severityLabel = severity.charAt(0).toUpperCase() + severity.slice(1);
  const colors = { critical: '#ef4444', high: '#f97316', medium: '#eab308', low: '#22c55e' };
  const color = colors[severity];

  const radius = size === 'lg' ? 70 : size === 'md' ? 50 : 32;
  const strokeWidth = size === 'lg' ? 8 : 6;
  const circumference = Math.PI * radius;
  const dashOffset = circumference - (circumference * animatedScore) / 100;

  const svgWidth = (radius + strokeWidth) * 2;
  const svgHeight = radius + strokeWidth + 10;
  const center = radius + strokeWidth;

  return (
    <div className={`risk-gauge risk-gauge-${size}`}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Track */}
        <path
          d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${svgWidth - strokeWidth} ${center}`}
          fill="none"
          stroke="var(--border-default)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Active Arc */}
        <path
          d={`M ${strokeWidth} ${center} A ${radius} ${radius} 0 0 1 ${svgWidth - strokeWidth} ${center}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className="gauge-score">
        <span className="gauge-number" style={{ color }}>{animatedScore}</span>
        <span className="gauge-total">/100</span>
      </div>
      <span className={`badge badge-${severity}`} style={{ marginTop: 2 }}>{severityLabel} Risk</span>
    </div>
  );
}
