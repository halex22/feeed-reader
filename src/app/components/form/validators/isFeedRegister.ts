import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isFeedRegistered(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { 
    const registeredFeed = localStorage.getItem('userFeeds')
    if (!registeredFeed) return null
    JSON.parse(registeredFeed).forEach((feed: any) => {
      if (feed.name === control.value) {
        return {feedAlreadyExists: true, message: 'the feed is already registered'}
      }
    })
    return null;
  };
}