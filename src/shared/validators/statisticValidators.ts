import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function fromDateMustBeforeToDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fromDate = control.get('dateFrom')?.value;
    const toDate = control.get('dateTo')?.value;

    if (fromDate && toDate && fromDate.id === toDate.id && fromDate > toDate) {
      return { fromDateMustBeBeforeToDate: true };
    }
    return null;
  };
}

