import axios from 'axios';

// define initial state
const initialState = {
  booking: {
    firstName: "",
    lastName: "",
    email: "",
    date: "",
    sending: {
      active: false,
      error: false,
    },
  },
  message: false,
  errors: []
};

/* selectors */
export const getBooking = ({ booking }) => booking;
export const getMessage = ({ message }) => message;
export const getErrors = ({ errors }) => errors;

/* action name creator */
const reducerName = 'booking';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
export const SEND_BOOKING_REQUEST = createActionName('SEND_BOOKING_REQUEST');
export const SEND_BOOKING_SUCCESS = createActionName('SEND_BOOKING_SUCCESS');
export const SEND_BOOKING_FAILURE = createActionName('SEND_BOOKING_FAILURE');
export const SET_VALUE = createActionName('SET_VALUE');
export const SEND_CHANGE = createActionName('SEND_CHANGE');

/* action creators */
export const sendBookingRequest = payload => ({ payload, type: SEND_BOOKING_REQUEST });
export const sendBookingSuccess = payload => ({ payload, type: SEND_BOOKING_SUCCESS });
export const sendBookingFailure = payload => ({ payload, type: SEND_BOOKING_FAILURE });
export const setValue = payload => ({ payload, type: SET_VALUE });
export const sendChange = payload => ({ payload, type: SEND_CHANGE });

/* thunk creators */
export const sendBooking = (data) => {
  return (dispatch) => {
    dispatch(sendBookingRequest());
    return axios
      .post('http://localhost:5000/api/booking/add', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        date: data.date,
      })
      .then(res => {
        dispatch(sendBookingSuccess(res.data));
      })
      .catch((error) => {
          const response = error.response;
          const data = response.data || [];
          dispatch(sendBookingFailure({
            message: 'Couldn\'t book the event. Please try again later!',
            errors: data.errors || []
      }))
    })
  }
}

/* reducer */
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case SEND_BOOKING_REQUEST: {
      return {
        ...statePart,
        booking: {
          ...statePart.booking,
          sending: {
            active: true,
            error: false,
          },
        },
        message: true,
        errors: []
      }
    }
    case SEND_BOOKING_SUCCESS: {
      return {
        ...initialState,
        booking: {
          ...initialState.booking,
          sending: {
            active: false,
            error: false
          }
        },
        message: action.payload,
        errors: []
      }
    }
    case SEND_BOOKING_FAILURE: {
      return {
        ...statePart,
        booking: {
          ...statePart.booking,
          sending: {
            active: false,
            error: true,
          },
        },
        message: action.payload.message,
        errors: action.payload.errors
      }
    }
    case SET_VALUE: {
      const newValue = { ...action.payload };
      return {
        ...statePart,
        booking: {
          ...statePart.booking,
          ...newValue
        },
        message: false,
        errors: []
      }
    }
    default:
      return statePart;
  }
}