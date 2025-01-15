import {ErrorMessage} from '../models/ErrorMessage';

export const AddUpdateHolidayErrorMessages = [
  new ErrorMessage('name', 'required', 'Name is required'),
  new ErrorMessage('name', 'minLength', 'Name must be at least 5 characters long'),
  new ErrorMessage('fromDate', 'required', 'From Date is required'),
  new ErrorMessage('type', 'required', 'Holiday type is required'),
  new ErrorMessage('toDate', 'required', 'To Date is required')
];
