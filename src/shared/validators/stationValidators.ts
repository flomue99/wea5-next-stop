import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function stationsMustDifferValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromStation = control.get('fromStation')?.value;
    const toStation = control.get('toStation')?.value;

    if (fromStation && toStation && fromStation.id === toStation.id) {
      return { stationsMustDiffer: true };
    }
    return null;
  };
}


export function stationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const station = control.value;

    if (!station || !station.id) {
      return { notValid: true };
    }
    return null;
  };
}
