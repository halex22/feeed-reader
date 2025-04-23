import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    const userInput:string = control.value
    console.log(userInput)
      if(userInput.match(urlRegex)){
          return null;
      }
      return {urlNotValid: true, message: 'input is not a valid url'};
  };
}
