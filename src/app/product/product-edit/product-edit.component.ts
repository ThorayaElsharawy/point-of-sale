import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductName } from 'src/app/productName.validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  form: FormGroup;
  id;

  constructor(private _route: ActivatedRoute,
    private _productService: ProductService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

    this.id = this._route.snapshot.paramMap.get('id');
    let name = this._route.snapshot.paramMap.get('name');

    this._productService.getProducts().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].id === this.id) {
          this.form.patchValue(response[i]);
        }
      }
    })

  }

  onEditProduct() {
    console.log(this.id);
    console.log(this.form.value);

    this._productService.editProduct(this.id, JSON.stringify(this.form.value)).subscribe(
      response => {
        console.log(response);
        this._snackBar.open('Updated successfully', '', { duration: 4000 });
      },
      error => {
        console.log(error)
        this._snackBar.open(error, '', { duration: 4000 });
      }
    )


  }

  get name() {
    return this.form.get('name')
  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }


}
