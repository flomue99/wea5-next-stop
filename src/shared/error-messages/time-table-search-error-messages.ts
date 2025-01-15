import {ErrorMessage} from '../models/ErrorMessage';

export const TimeTableSearchErrorMessages = [
  new ErrorMessage('fromStation', 'required', 'From Station is required'),
  new ErrorMessage('fromStation', 'notValid', 'Please select a valid station'),
  new ErrorMessage('toStation', 'required', 'To Station is required'),
  new ErrorMessage('toStation', 'notValid', 'Please select a valid station'),
  new ErrorMessage('date', 'required', 'Date is required'),
  new ErrorMessage('time', 'required', 'Time is required'),
  new ErrorMessage('maxConnections', 'required', 'Max Connections is required'),
  new ErrorMessage('maxConnections', 'min', 'Max Connections must be at least 1')
];
