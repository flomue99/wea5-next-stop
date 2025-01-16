import {ErrorMessage} from '../models/ErrorMessage';

export const AddUpdateRouteErrorMessages = [
  new ErrorMessage('routeNumber', 'required', 'Route number is required'),
  new ErrorMessage('routeNumber', 'min', 'Route numer has to be greater than 0'),
  new ErrorMessage('validFrom', 'required', 'Valid from date is required'),
  new ErrorMessage('validTo', 'required', 'Valid to date is required'),
  new ErrorMessage('routeStops', 'required', 'Route stops are required'),
  new ErrorMessage('routeStops', 'departureTimesNotAscending', 'The departure times must be in ascending order'),
  new ErrorMessage('station', 'required', 'To Station is required'),
  new ErrorMessage('station', 'notValid', 'Please select a valid station'),
  new ErrorMessage('departureTime', 'required', 'Departure time is required'),
];
