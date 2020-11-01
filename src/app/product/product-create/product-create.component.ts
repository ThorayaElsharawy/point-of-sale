import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductName } from 'src/app/productName.validators';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

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
