import PropTypes from 'prop-types';

function Toggle({ status, setStatus, leftText, rightText }) {
  return (
    <div className="toggle">
      <div
        className={`slider ${status === 'Completed' ? 'left' : 'right'}`}
      ></div>
      <button
        className={status === 'Completed' ? 'active' : ''}
        onClick={() => setStatus('Completed')}
      >
        {leftText}
      </button>
      <button
        className={status === 'To Read' ? 'active' : ''}
        onClick={() => setStatus('To Read')}
      >
        {rightText}
      </button>
    </div>
  );
}

Toggle.propTypes = {
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
  leftText: PropTypes.string.isRequired,
  rightText: PropTypes.string.isRequired,
};

export default Toggle;
