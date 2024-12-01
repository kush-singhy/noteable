import PropTypes from 'prop-types';

function StatusBadge({ status }) {
  return status === 'Completed' ? (
    <span className="badge rounded-pill read-badge">Read</span>
  ) : (
    <span className="badge rounded-pill to-read-badge">To Read</span>
  );
}
StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
