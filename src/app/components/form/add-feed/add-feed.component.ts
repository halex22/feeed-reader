import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
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

  constructor(private feedService: FeedService) {}

  ngOnInit() {
    this.addForms.push(this.createSingleForm());
  }

  get addForms() {
    return this.bigForm.get('addFeedForms') as FormArray;
  }

  createSingleForm() {
    return new FormGroup({
      name: new FormControl('', {
        validators: [isRequired(), minNameLength(), includesEmptySpaces()],
      }),
      type: new FormControl<'reddit' | 'base'>('reddit', {
        validators: [isRequired()],
      }),
      url: new FormControl('', {
        validators: [isUrlValidator()],
        asyncValidators: [
          // fare una chiamata res => res.ok
          // abbia una risposta sensata
        ],
        updateOn: 'blur',
      }),
      alias: new FormControl(''),
    });
  }

  addBlankForm() {
    this.addForms.push(this.createSingleForm());
  }

  deleteForm(innerFormId: number) {
    if (this.addForms.length === 1) return;
    this.addForms.removeAt(innerFormId);
  }

  logFormErrors() {

    console.info('debugging section')
    
    this.feedFormsArrayControls.forEach((formGroup, i) => {
      console.log('logging ', i , 'feed form')
      const singleForm = formGroup as FormGroup
      this.logSingleFormErrors(singleForm)
      console.log('--------------------------------------------------')
    })

  }

  logSingleFormErrors(group: FormGroup) {
    for (const key in group.controls) {
      if (Object.prototype.hasOwnProperty.call(group.controls, key)) {
        const formControl = group.get(key);
        if (formControl?.errors) {
          console.log('errors found at key ', key)
          console.log(formControl.errors)
        }
      }
    }
  }

  logAFormGroup(group: AbstractControl, controlName: string) {
    const errors = []
    const currentGroup = group as FormGroup
    console.log(currentGroup.get(controlName)?.errors, controlName)
    // if (currentGroup.get(controlName)?.errors) {
    //   return Object.keys(currentGroup.get(controlName)?.errors ?? {noErrors:true}) 
    // }
    return Object.values(currentGroup.get(controlName)?.errors ?? {noErrors:true}) 
    
  }

  get feedFormsArrayControls() {
    return this.bigForm.controls.addFeedForms.controls
  }

  onSubmit() {
    const formArray = this.bigForm.controls.addFeedForms;

    console.log(this.bigForm.errors)
    this.logFormErrors()
    // if (this.bigForm.invalid) return

    /////// qui ci arriviamo se la form è valida
    console.log(formArray, 'queste sono tutti i form');

    for (const singleFormGroup in this.feedFormsArrayControls) {
      if (Object.prototype.hasOwnProperty.call(this.feedFormsArrayControls, singleFormGroup)) {
        const currentFormGroup = formArray.get(singleFormGroup);

        console.log(currentFormGroup, 'current form Group');

        const currentFeedTypeControl = currentFormGroup?.get('type') as FormControl;

        console.log(currentFeedTypeControl.value, 'current form feed type');

        let newFeedSource: FeedSource
        if (currentFeedTypeControl.value === 'reddit') {
          newFeedSource = this.handleRedditFeedCreation(currentFormGroup!)
        } else {
          newFeedSource = this.handleRssFeedCreation(currentFormGroup!)
        }
      }
    }
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

  updateRadiusBtn(event: Event, formIndex: number) {
    const formGroupTarget = this.addForms.get(`${formIndex}`) as FormGroup;
    console.log(formGroupTarget.controls['type'].value, 'current feed type');
  }

  get daPensare() {
    // logica per non fare aggiungere altre form se non si ha compilato il precedente corretametne
    return null;
  }

}
