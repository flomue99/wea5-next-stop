import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';


export function datesMustDiffer(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromDate = control.get('fromDate')?.value;
    const toDate = control.get('toDate')?.value;

    if (fromDate && toDate) {
      const fromDateOnly = new Date(fromDate.setHours(0, 0, 0, 0));
      const toDateOnly = new Date(toDate.setHours(0, 0, 0, 0));

      if (fromDateOnly.getTime() === toDateOnly.getTime()) {
        return { datesMustDiffer: true };
      }
    }
    return null;
  };
}


export function fromDateMustBeforeToDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromDate = control.get('fromDate')?.value;
    const toDate = control.get('toDate')?.value;

    if (fromDate && toDate && fromDate.id === toDate.id && fromDate > toDate) {
      return { fromDateMustBeBeforeToDate: true };
    }
    return null;
  };
}

export function datesMustBeSame(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromDate = control.get('fromDate')?.value;
    const toDate = control.get('toDate')?.value;

    if (fromDate && toDate) {
      const fromDateOnly = new Date(fromDate.setHours(0, 0, 0, 0));
      const toDateOnly = new Date(toDate.setHours(0, 0, 0, 0));

      if (fromDateOnly.getTime() !== toDateOnly.getTime()) {
        return { datesMustBeSame: true };
      }
    }
    return null;
  };
}
