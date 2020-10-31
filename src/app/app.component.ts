import { ProductService } from './services/product.service';
import { ProductName } from './productName.validators';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'point-of-sale';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  form;

  constructor(private _fb: FormBuilder,
    private _productService: ProductService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = this._fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        ProductName.cannotContainSpace
      ],
        ProductName.shouldBeUnique
      ],
      categoryId: [],
      brandId: [],
      unitId: [],
      barcode: [],
      price: [],
      salePrice: [],
      quantity: [],
      typeId: [],
      description: []
    });
  }

  onCreateProduct() {
    let body = this.form.value;
    this._productService.createProduct(body).subscribe(
      response => {
        this._snackBar.open('successs', '', { duration: 4000 });
        this.form.reset()
      },
      (error) => {
        console.log(error)
        this._snackBar.open(error, '', { duration: 4000 });
      });
  }



  get name() {
    return this.form.get('name')
  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
