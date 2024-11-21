import React from 'react';

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
        className={!(status === 'Completed') ? 'active' : ''}
        onClick={() => setStatus('To Read')}
      >
        {rightText}
      </button>
    </div>
  );
}

export default Toggle;
