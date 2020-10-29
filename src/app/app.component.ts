import { ProductName } from './productName.validators';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'point-of-sale';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  form;

  constructor(private _fb: FormBuilder) {
    this.form = _fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        ProductName.cannotContainSpace
      ],
        ProductName.shouldBeUnique
      ],
      category: [],
      brand: [],
      unit: [],
      barcode: [],
      price: [],
      salePrice: [],
      alertQuantity: [],
      taxType: [],
      description: []
    })
  }

  onSave() {
    this.form.setErrors({
      invalidSave: true
    })
  }

  get name() {
    return this.form.get('name')
  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
