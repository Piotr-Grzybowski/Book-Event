import React from 'react';
import './Message.css';

function Message({ message, loader, errors }) {
  const errorsList = errors.map((error, index) =>
    <li key={index}>{error.msg}</li>
  )
  if (message && loader.active) {
    return(
      <div className="loader-wrapper"><div className="loader"  data-testid="loader"></div></div>
    )
  } else if (message) {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header" data-testid="modal-header">
            <span className="close">&times;</span>
            <h2>{loader.error ? 'Failure' : 'Success'}</h2>
          </div>
          <div className="modal-body" data-testid="message">
            <p>{message}</p>
            {errors.length ? <div><h3>Errors: </h3><ul data-testid="errors">{errorsList}</ul></div> : ''}
          </div>
          <div className="modal-footer" data-testid="modal-footer">
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

Message.displayName = 'Message';

export default Message;