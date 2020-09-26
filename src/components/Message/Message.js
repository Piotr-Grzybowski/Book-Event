import React from 'react';
import './Message.css';

function Message({ message, loader }) {
  if (message) {
    if (!loader.active) {
      return (
        <div className="message" data-testid="message">
          <p>{message}</p>
        </div>
      )
    }
    return (
      <div className='loader' data-testid="loader">
      </div>
    )
  }
  return (
    <div className="emptyDiv" data-testid="emptyDiv"></div>
  )
}

export default Message;