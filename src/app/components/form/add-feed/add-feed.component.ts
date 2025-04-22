import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormControl, ReactiveFormsModule} from '@angular/forms'
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-add-feed',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './add-feed.component.html',
  styleUrl: './add-feed.component.scss'
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
        validators: [],
        asyncValidators: [
          // fare una chiamata res => res.ok 
          // abbia una risposta sensata
        ]
      }),
      alias: new FormControl('')
  
    })
  }

  addBlankForm() {
    this.addForms.push(this.createSingleForm())
  }

  onSubmit() {
    console.log(this.bigForm.controls)
  }

  get daPensare(){
    return null
  }
}

// implement logic according to RSS or XML
