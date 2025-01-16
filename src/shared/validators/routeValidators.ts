import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function fromDateMustBeforeToDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromDate = control.get('validFrom')?.value;
    const toDate = control.get('validTo')?.value;

    if (fromDate && toDate && fromDate.id === toDate.id && fromDate > toDate) {
      return { fromDateMustBeBeforeToDate: true };
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

export function departureTimesInAscendingOrder(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const routeStops = control.value;

    if (!Array.isArray(routeStops) || routeStops.length <= 1) {
      return null;
    }

    for (let i = 1; i < routeStops.length; i++) {
      const previousStop = routeStops[i - 1];
      const currentStop = routeStops[i];

      // Skip validation if either time is missing
      if (!previousStop.departureTime || !currentStop.departureTime) {
        continue;
      }

      const previousTime = new Date(previousStop.departureTime).getTime();
      const currentTime = new Date(currentStop.departureTime).getTime();

      if (currentTime <= previousTime) {
        return { departureTimesNotAscending : true };
      }
    }

    return null;
  };
}
