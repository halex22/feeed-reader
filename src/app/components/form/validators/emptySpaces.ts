import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


/**
 * The function `includesEmptySpaces` is a TypeScript validator that checks if a user input contains
 * empty spaces at the end and returns an error message if it does.
 * @returns A ValidatorFn function is being returned. This function takes an AbstractControl as input
 * and returns either ValidationErrors or null based on the validation logic provided within the
 * function.
 */
export function includesEmptySpaces(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
    const userInput:string = control.value
      if(!userInput.trimEnd().includes(' ')) return null
      return {message: 'no white spaces are allowed in name'};
  };
}