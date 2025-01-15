import {ErrorMessage} from '../models/ErrorMessage';

export const AddUpdateStationErrorMessages = [
  new ErrorMessage('name', 'required', 'Name is required'),
  new ErrorMessage('abbreviation', 'required', 'Abbreviation is required'),
  new ErrorMessage('abbreviation', 'pattern', 'Abbreviation must contain only letters and numbers'),
  new ErrorMessage('latitude', 'required', 'Latitude is required'),
  new ErrorMessage('latitude', 'min', 'Latitude has to be between -90 and 90'),
  new ErrorMessage('latitude', 'max', 'Latitude has to be between -90 and 90'),
  new ErrorMessage('longitude', 'required', 'Longitude is required'),
  new ErrorMessage('longitude', 'min', 'Longitude has to be between -180 and 180'),
  new ErrorMessage('longitude', 'max', 'Longitude has to be between -180 and 180')
];
