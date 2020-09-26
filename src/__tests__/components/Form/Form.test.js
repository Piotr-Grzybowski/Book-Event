import React from 'react';
import Form from '../../../components/Form/Form';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import register from 'ignore-styles';
register(['.css', '.sass', '.scss']);

describe('Form component test:', () => {
  // workaround for date-picker issue
  const formatDate = (date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }
  const props = {
    bookingData: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example',
      date: new Date(1811112121119),
      sending: {
        active: false,
        error: false
      }
    },
    message: ' ',
    setValue: jest.fn(),
    sendBooking: jest.fn()
  }
  let getByTestId, container, firstName, lastName, email, date, submitButton;
  const setValue = jest.fn();
  const sendBooking = jest.fn();
  
  beforeEach(() => {
    ({ container, getByTestId } = render(<Form {...props} setValue={setValue} sendBooking={sendBooking} />));
    firstName = getByTestId('firstName');
    lastName = getByTestId('lastName');
    email = getByTestId('email');
    date = container.querySelector('.react-datepicker__input-container').firstChild;
    submitButton = getByTestId('submit');
  });
  afterEach(() => {
    cleanup();
  });
  
  it('should match snapshot', () => {
    const snapshot = renderer.create(<Form {...props} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  it('should render form with correct inputs', () => {
    const form = getByTestId('form');
    expect(form).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
  it('should value in input be the same like in props', () => {
    expect(firstName.value).toBe(props.bookingData.firstName);
    expect(lastName.value).toBe(props.bookingData.lastName);
    expect(email.value).toBe(props.bookingData.email);
    expect(new Date(date.value).toLocaleDateString('en-US')).toBe(formatDate(props.bookingData.date).toLocaleDateString('en-US'));
  })
  it('should call setValue method when input value changes', () => {
    fireEvent.change(firstName, { target: { value: 'Chuck' }});
    expect(setValue).toHaveBeenCalledWith({firstName: 'Chuck'});
    fireEvent.change(lastName, { target: { value: 'Johnson' }});
    expect(setValue).toHaveBeenCalledWith({lastName: 'Johnson'});
    fireEvent.change(email, { target: { value: 'Chuck@somewhere' }});
    expect(setValue).toHaveBeenCalledWith({email: 'Chuck@somewhere'});
    fireEvent.change(date, { target: { value: new Date(411112121119) }})
    expect(setValue).toHaveBeenCalledTimes(4);
  })
  it('should call sendBooking method on submit with input values', () => {
    fireEvent.submit(submitButton);
    expect(sendBooking).toHaveBeenCalledTimes(1);
    expect(sendBooking).toHaveBeenCalledWith({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      date: new Date(1811112121119),
      sending: {
        active: false,
        error: false
      }
    });
  })
})