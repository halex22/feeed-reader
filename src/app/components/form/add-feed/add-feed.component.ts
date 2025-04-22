import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormArray, FormControl, ReactiveFormsModule} from '@angular/forms'
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { isUrlValidator } from '../validators/isUrlValidator';


@Component({
  selector: 'app-add-feed',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatRadioModule, MatButtonModule,
    MatFormFieldModule, MatIconModule, MatInputModule, NgIf
  ],
  templateUrl: './add-feed.component.html',
  styleUrl: './add-feed.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddFeedComponent  implements OnInit {

  bigForm = new FormGroup({
    addFeedForms: new FormArray([])
  })

  ngOnInit() {
    this.addForms.push(this.createSingleForm())
  }

  get addForms(){
    return this.bigForm.get('addFeedForms') as FormArray
  }

  createSingleForm() {
    return new FormGroup({
      name: new FormControl('', {}),
      type: new FormControl<'reddit' | 'base'>('reddit'),
      url: new FormControl('', {
        // validator rgex input sia ulr https:// 
        validators: [isUrlValidator()],
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
    console.log(this.bigForm.controls)
    for (const control in this.bigForm) {
      if (Object.prototype.hasOwnProperty.call(this.bigForm, control)) {
        const element = this.bigForm.get(control);
        console.log(element)
        
      }
    }
  }

  get daPensare(){
    // logica per non fare aggiungere altre form se non si ha compilato il precedente corretametne
    return null
  }

  get isFeedReddit() {
    return this.addForms.get('type')?.value === 'reddit'
  }

  get nameLabel() {
    return this.isFeedReddit ? '/subreddit name' : 'news provider' 
  }

  isInputValid() {}
}

// implement logic according to RSS or XML
