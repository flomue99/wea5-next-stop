import {ErrorMessage} from '../models/ErrorMessage';

export const StatisticErrorMessages = [
  new ErrorMessage('dateFrom', 'required', 'From Date is required'),
  new ErrorMessage('dateTo', 'required', 'To Date is required'),
];
