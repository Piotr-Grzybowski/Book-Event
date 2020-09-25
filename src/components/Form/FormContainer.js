import { connect } from 'react-redux';
import Form from './Form';
import { setValue, sendBooking, getBooking, getMessage, sendChange } from '../../redux/bookingRedux';

const mapStateToProps = (state) => ({
  bookingData: getBooking(state),
  message: getMessage(state)
});

const mapDispatchToProps = (dispatch) => ({
  sendBooking: () => dispatch(sendBooking()),
  setValue: (value) => dispatch(setValue(value)),
  sendChange: () => dispatch(sendChange())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);