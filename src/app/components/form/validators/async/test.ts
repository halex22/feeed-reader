import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, timer, tap } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SubredditValidatorService {
  constructor(private http: HttpClient) {}

  validateSubredditDebounced(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const subreddit = control.value?.trim();
      if (!subreddit) return of(null);

      return timer(300).pipe( // Debounce for 300ms
        tap(() => console.log('getting')),
        switchMap(() =>
          this.http.get(`https://www.reddit.com/r/${subreddit}/about.json`).pipe(
            map(() => null),
            catchError(() => of({ message: 'invalid subreddit' }))
          )
        )
      );
    };
  }
}
