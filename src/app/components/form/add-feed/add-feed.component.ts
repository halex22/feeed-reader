import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormArray, FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { isUrlValidator } from '../validators/isUrlValidator';
import { FeedService } from '../../../services/feed.service';
import { FeedSource } from '../../../models/feed';


@Component({
  selector: 'app-add-feed',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatRadioModule, MatButtonModule,
    MatFormFieldModule, MatIconModule, MatInputModule, CommonModule
  ],
  templateUrl: './add-feed.component.html',
  styleUrl: './add-feed.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddFeedComponent  implements OnInit {

  bigForm = new FormGroup({
    addFeedForms: new FormArray([])
  })

  constructor (private feedService: FeedService) {}

  ngOnInit() {
    this.addForms.push(this.createSingleForm())
  }

  get addForms(){
    return this.bigForm.get('addFeedForms') as FormArray
  }

  createSingleForm() {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      type: new FormControl<'reddit' | 'base'>('reddit', {
        validators: [Validators.required]
      }),
      url: new FormControl('', {
        // validator rgex input sia ulr https:// 
        validators: [isUrlValidator(), Validators.minLength(20)],
        asyncValidators: [
          
          // fare una chiamata res => res.ok 
          // abbia una risposta sensata
        ],
        updateOn: 'blur'
      }),
      alias: new FormControl('')
  
    })
  }

  addBlankForm() {
    this.addForms.push(this.createSingleForm())
  }

  deleteForm(innerFormId: number) {
    if (this.addForms.length === 1) return
    this.addForms.removeAt(innerFormId)
  }

  onSubmit() {
    const formArray = this.bigForm.controls.addFeedForms

    // if (this.bigForm.invalid) return

    /////// qui ci arriviamo se la form è valida 
    console.log(formArray, 'queste sono tutti i form')

    for (const singleFormGroup in formArray.controls) {
      if (Object.prototype.hasOwnProperty.call(formArray.controls, singleFormGroup)) {
        const currentFormGroup = formArray.get(singleFormGroup);

        console.log(currentFormGroup, 'current form Group')

        const currentFeedTypeControl = currentFormGroup?.get('type') as FormControl
        
        console.log(currentFeedTypeControl.value, 'current form feed type')

        if (currentFeedTypeControl.value === 'reddit') {
          const redditName = currentFormGroup?.get('name')
          if (redditName) {
            const source: FeedSource = {
              feedName: redditName.value,
              feedUrl: `https://www.reddit.com/r/${redditName.value}.json`,
              type: 'reddit'
            }
            this.feedService.addFeedSource(source)
            // fetch(`https://www.reddit.com/r/${redditName.value}.json`)
            // .then(res => res.json())
            // .then(data => console.log(data))
          }
        }

        
      }
    }


    

  }

  updateRadiusBtn(event: Event, formIndex: number) {

    const formGroupTarget = this.addForms.get(`${formIndex}`) as FormGroup
    console.log(formGroupTarget.controls['type'].value, 'current feed type')

  }

  get daPensare(){
    // logica per non fare aggiungere altre form se non si ha compilato il precedente corretametne
    return null
  }

  get isFeedReddit() {
    return this.addForms.get('type')?.value === 'reddit'
  }



}

// implement logic according to RSS or XML
