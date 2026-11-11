import PropTypes from 'prop-types';

export default function StatCard({ label, value, helper, icon: Icon, accent = 'lime', trend }) {
  return (
    <article className={`stat-card stat-${accent}`}>
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon"><Icon size={19} strokeWidth={1.9} /></span>
      </div>
      <div className="stat-value-row">
        <strong>{value}</strong>
        {trend && <span className="stat-trend">{trend}</span>}
      </div>
      <span className="stat-helper">{helper}</span>
    </article>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  helper: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  accent: PropTypes.oneOf(['lime', 'orange', 'blue', 'purple']),
  trend: PropTypes.string,
};
