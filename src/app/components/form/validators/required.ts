import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
    const userInput:string = control.value
      if(userInput) return null
      return {message: 'input is required'};
  };
}
