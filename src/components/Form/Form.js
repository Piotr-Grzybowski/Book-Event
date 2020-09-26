import React from 'react';
import DatePicker from 'react-datepicker';
import Message from '../Message/Message';
import "./Form.css";
import "./react-datepicker.css";
import PropTypes from 'prop-types';

function Form({ bookingData, setValue, sendBooking, message}) {
  // workaround for datePicker inside issue
  const formatDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }
  return (
    <div className="container">
      <form data-testid="form" id="booking" onSubmit={(event) => { event.preventDefault(); sendBooking(bookingData)}} >
        <h1>Book the event</h1>
        <fieldset>
        <input data-testid="firstName" className="firstName" placeholder="First name" type="text" value={bookingData.firstName} required onChange={(event) => { setValue({ firstName: event.target.value }) }}></input>
        </fieldset>
        <fieldset>
        <input data-testid="lastName" className="lastName" type="text" placeholder="Last name" value={bookingData.lastName} required onChange={(event) => { setValue({ lastName: event.target.value }) }}></input>
        </fieldset>
        <fieldset>
        <input data-testid="email" className="email" type="email" placeholder="Email address" value={bookingData.email} required onChange={(event) => { setValue({ email: event.target.value }) }}></input>
        </fieldset>
        <fieldset>
        <div className="datePicker"><DatePicker placeholderText="Date of event" selected={bookingData.date} value={bookingData.date} onChange={(date) => setValue({ date: formatDate(date) })} required /></div>
        </fieldset>
        <fieldset>
        <button data-testid="submit" type="submit">Submit</button>
        </fieldset>
      </form>
      <Message message={message} loader={bookingData.sending} />
    </div>
  );
}

Form.propTypes = {
  bookingData: PropTypes.object,
  setValue: PropTypes.func,
  sendBooking: PropTypes.func,
  getMessage: PropTypes.object
}

export default Form;