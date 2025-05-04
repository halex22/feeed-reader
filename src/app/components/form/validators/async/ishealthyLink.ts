import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

export function isHealthyUrl(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null>  => {
    const targetUrl = control.value

    if (!targetUrl) {
      return Promise.resolve(null)
    }

    return fetch(targetUrl)
    .then(res => {
      if (res.ok) return null
      return {message: 'seems that the url provided is not working'}
    })
    .catch(() => {
      return {message: 'network error please check out your internet connection'}
    })
  }
}