import React from 'react';
import DatePicker from 'react-datepicker';
import Message from '../Message/Message';
import "./react-datepicker.css";
import PropTypes from 'prop-types';

function Form({ bookingData, setValue, sendBooking, message}) {
  // workaround for datePicker inside issue
  const formatDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }
  return (
    <div>
      <form data-testid="form" onSubmit={(event) => { event.preventDefault(); sendBooking(bookingData)}} >
        <input data-testid="firstName" type="text" value={bookingData.firstName} required onChange={(event) => { setValue({ firstName: event.target.value }) }}></input>
        <input data-testid="lastName" type="text" value={bookingData.lastName} required onChange={(event) => { setValue({ lastName: event.target.value }) }}></input>
        <input data-testid="email" type="email" value={bookingData.email} required onChange={(event) => { setValue({ email: event.target.value }) }}></input>
        <DatePicker selected={bookingData.date} value={bookingData.date} onChange={(date) => setValue({ date: formatDate(date) })} required />
        <button data-testid="submit">Submit</button>
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