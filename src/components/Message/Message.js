import React from 'react';
import './Message.css';

function Message({ message, loader }) {
  if (message && loader.active) {
    return(
      <div className="loader modal" data-testid="loader"></div>
    )
  } else if (message) {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h2>{loader.error ? 'Failure' : 'Success'}</h2>
          </div>
          <div className="modal-body" data-testid="message">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <h3>{loader.error ? 'Something went wrong!' : 'Everything went smoothly!'}</h3>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="emptyDiv" data-testid="emptyDiv"></div>
  )
}

export default Message;