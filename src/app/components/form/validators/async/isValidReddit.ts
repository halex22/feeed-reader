import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

export function validateSubredditWithPromise(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    const subreddit = control.value?.trim();

    if (!subreddit) {
      return Promise.resolve(null); // Empty input is valid
    }

    const url = `https://www.reddit.com/r/${subreddit}/about.json`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return null; // Subreddit exists
        } else {
          return { message: 'not a valid subreddit' }
        }
      })
      .catch(() => {
        return { invalidSubreddit: 'could not validate subreddit please try latter' }
      })
  };
}
