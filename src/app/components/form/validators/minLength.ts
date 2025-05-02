import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minNameLength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
    const userInputLen:number = control.value.length
      if(userInputLen >= 4) return null     
     
      return {message: `name must be at least 4 char long, current input is ${userInputLen}`};
  };
}