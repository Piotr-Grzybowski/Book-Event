import { SEND_BOOKING_REQUEST, SEND_BOOKING_SUCCESS, SEND_BOOKING_FAILURE, SET_VALUE } from '../../redux/bookingRedux';
import { sendBookingRequest, sendBookingSuccess, sendBookingFailure, setValue, sendBooking } from '../../redux/bookingRedux';
import reducer from '../../redux/bookingRedux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const messageSuccess = 'Event booked successfully';
const messageFailure = 'Couldn\'t book the event. Please try again later!';
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
  message: false
};

describe('Actions: ', () => {
  it('should create action to send booking request', () => {
    const expectedAction = {
      type: SEND_BOOKING_REQUEST,
    }
    expect(sendBookingRequest()).toEqual(expectedAction);
  });
  it('should create action for booking success', () => {
    const payload = { booking: { firstName: 'John' } };
    const expectedAction = {
      type: SEND_BOOKING_SUCCESS,
      payload
    }
    expect(sendBookingSuccess(payload)).toEqual(expectedAction);
  });
  it('should create action for booking failure', () => {
    const payload = { booking: { firstName: 'John' } };
    const expectedAction = {
      type: SEND_BOOKING_FAILURE,
      payload
    }
    expect(sendBookingFailure(payload)).toEqual(expectedAction);
  });
  it('should create action to set new value', () => {
    const payload = { booking: { firstName: 'John' } };
    const expectedAction = {
      type: SET_VALUE,
      payload
    }
    expect(setValue(payload)).toEqual(expectedAction);
  });
});

describe('Async action thunk creator', () => {
  // workaround for console.error issue
  const original = console.error;
  let store;
  beforeEach(() => {
    console.error = jest.fn();
    // Mock store
    store = mockStore(initialState);
  });
  afterEach(() => {
    mock.restore();
    console.error = original;
  })

  it('creates SEND_BOOKING_SUCCESS when sending booking has been done', () => {
    mock.onPost('http://localhost:5000/api/booking/add').reply(200, messageSuccess);

    const expectedActions = [
      { type: SEND_BOOKING_REQUEST },
      {
        type: SEND_BOOKING_SUCCESS,
        payload: 'Event booked successfully'
      }
    ]

    return store.dispatch(sendBooking(initialState)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
  it('creates SEND_BOOKING_FAILURE when sending booking hasn\'t succeeded', () => {
    mock.onPost('http://localhost:5000/api/booking/add').reply(400);

    const expectedActions = [
      { type: SEND_BOOKING_REQUEST },
      {
        type: SEND_BOOKING_FAILURE,
        payload: messageFailure
      }
    ]

    return store.dispatch(sendBooking(initialState)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
});

describe('Booking reducer', () => {
  it('should return the initial state', () => {
      expect(reducer(initialState, {})).toEqual(initialState);
  });
  it('should handle SEND_BOOKING_REQUEST', () => {
      expect(reducer([], {
        type: SEND_BOOKING_REQUEST
      })).toEqual({
        booking: {
          sending: {
            active: true,
            error: false,
          }
        },
        message: true
      })
  })
  it('should handle SEND_BOOKING_SUCCESS', () => {
      expect(reducer([], {
        type: SEND_BOOKING_SUCCESS,
        payload: messageSuccess
      })).toEqual({
        booking: {
          sending: {
            active: false,
            error: false,
          }
        },
        message: messageSuccess
      })
  })
  it('should handle SEND_BOOKING_FAILURE', () => {
      expect(reducer([], {
        type: SEND_BOOKING_FAILURE,
        payload: messageFailure
      })).toEqual({
        booking: {
          sending: {
            active: false,
            error: true,
          },
        },
        message: messageFailure
    })
  })
  it('should handle SET_VALUE', () => {
      expect(reducer(initialState, {
        type: SET_VALUE,
        payload: {
          firstName: 'John',
          lastName: 'Abrams'
        }
      })).toEqual({
        booking: {
          firstName: "John",
          lastName: "Abrams",
          email: "",
          date: "",
          sending: {
            active: false,
            error: false,
          }
        },
        message: false
      })
  })
});