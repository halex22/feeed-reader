import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { isUrlValidator } from '../validators/isUrlValidator';
import { FeedService } from '../../../services/feed.service';
import { FeedSource } from '../../../models/feed';
import { isRequired } from '../validators/required';
import { minNameLength } from '../validators/minLength';
import { includesEmptySpaces } from '../validators/emptySpaces';
import { validateSubredditWithPromise } from '../validators/async/isValidReddit';
import { isHealthyUrl } from '../validators/async/ishealthyLink';
import { SubredditValidatorService } from '../validators/async/test';

@Component({
  selector: 'app-add-feed',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './add-feed.component.html',
  styleUrl: './add-feed.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AddFeedComponent implements OnInit {

  bigForm = new FormGroup({
    addFeedForms: new FormArray([]),
  });

  constructor(private feedService: FeedService, private subredditValidator: SubredditValidatorService) {}

  ngOnInit() {
    this.addForms.push(this.createSingleForm());
  }

  get addForms() {
    return this.bigForm.get('addFeedForms') as FormArray;
  }

  createSingleForm(): FormGroup {
    const group = new FormGroup({
      name: new FormControl('', {
        validators: [isRequired(), minNameLength(), includesEmptySpaces()],
        // asyncValidators: [this.subredditValidator.validateSubredditDebounced()],
      }),
      type: new FormControl<'reddit' | 'base'>('reddit', {
        validators: [isRequired()],
      }),
      url: new FormControl('', {
        validators: [isRequired()],
      }),
    });

    group.get('type')!.valueChanges.subscribe(type => {
      console.log('changing...')
      this.handleGroupValidator(type!, group)
    })

    this.handleGroupValidator(group.get('type')!.value!, group)

    return group
  }

  addBlankForm() {
    this.addForms.push(this.createSingleForm());
  }

  deleteForm(innerFormId: number) {
    if (this.addForms.length === 1) return;
    this.addForms.removeAt(innerFormId);
  }


  logAFormGroup(group: AbstractControl, controlName: string) {
    const errors = []
    const currentGroup = group as FormGroup
    return Object.values(currentGroup.get(controlName)?.errors ?? {noErrors:true})
  }

  get feedFormsArrayControls() {
    return this.bigForm.controls.addFeedForms.controls
  }

  onSubmit() {
    const formArray = this.bigForm.controls.addFeedForms;


    for (const singleFormGroup in this.feedFormsArrayControls) {
      if (Object.prototype.hasOwnProperty.call(this.feedFormsArrayControls, singleFormGroup)) {
        const currentFormGroup = formArray.get(singleFormGroup) as FormGroup;

        const currentFeedTypeControl = currentFormGroup.get('type')!.value
        // this.handleFormControlValidators(currentFeedTypeControl, currentFormGroup)

        console.log('is form group valid ? ', currentFormGroup.invalid)
        if (!currentFormGroup.invalid) return

        console.log('can proceed')

        let newFeedSource: FeedSource

        if (currentFeedTypeControl === 'reddit') {
          newFeedSource = this.handleRedditFeedCreation(currentFormGroup!)
        } else {
          newFeedSource = this.handleRssFeedCreation(currentFormGroup!)
        }

        console.log(newFeedSource)
        console.log('here I should save')
        // this.feedService.addFeedSource(newFeedSource)

      }
    }
  }

  handleGroupValidator(inputType:string, innerForm: FormGroup) {
    const nameControl = innerForm.get('name')! as FormControl
    const urlControl = innerForm.get('url')! as FormControl


    if (inputType === 'reddit') {
      // urlControl.removeValidators([isRequired()])

      urlControl.clearValidators()
      urlControl.clearAsyncValidators()
      urlControl.updateValueAndValidity()

      nameControl.setAsyncValidators([this.subredditValidator.validateSubredditDebounced()])
      nameControl.updateValueAndValidity()

    } else {
      urlControl.setValidators([isRequired()])
      urlControl.updateValueAndValidity()

      nameControl.clearAsyncValidators();
      nameControl.updateValueAndValidity();
    }

    console.log(urlControl.errors)
    console.log(nameControl.errors)

  }

  private handleRedditFeedCreation(control: AbstractControl): FeedSource {
    const targetName = control!.get('name')
    return {
      feedName: targetName!.value,
      feedUrl: `https://www.reddit.com/r/${targetName!.value}.json`,
      type: 'reddit',
    };
  }

  private handleRssFeedCreation(control: AbstractControl): FeedSource {
    const targetName = control!.get('name')
    const targetUrl  = control!.get('url')
    return {
      feedName: targetName!.value,
      feedUrl: targetUrl!.value,
      type: 'rss'
    }
  }

  getControlError(groupIndex: number, controlName: string): string | null {
    const control = this.addForms.at(groupIndex).get(controlName)
    if (control && control.invalid && (control.dirty || control.touched)) {
      const errors = control.errors!;
      return errors['message']
    }
    return null
  }

}
