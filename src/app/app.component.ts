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
export class AppComponent {
  title = 'point-of-sale';
  panelOpenState = false;

  constructor() { }

  nowDate = new Date()

}
