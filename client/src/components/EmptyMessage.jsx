import React from 'react';
import EmptyIcon from '../assets/empty-icon.svg';

function EmptyMessage() {
  return (
    <div className="empty-container">
      <img src={EmptyIcon} className="empty-icon" alt="empty-icon" />
      <p className="empty-main-text">Your library is empty</p>
      <p className="empty-sub-text">
        Start building your collection by adding your favorite books!
      </p>
    </div>
  );
}

export default EmptyMessage;
