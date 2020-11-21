import { CategoryService } from './../../services/category.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  form;

  constructor(private _fb: FormBuilder,
    private _categoryServices: CategoryService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CategoryCreateComponent>,
    private _router: Router) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      description: []
    })
  }

  onCreateCategory() {
    this._categoryServices.createCategory(this.form.value).subscribe(response => {
      console.log(response)
      this._snackBar.open('Added successfully', '', { duration: 4000 });
      this.dialogRef.close();
      this._router.navigate(['categories']);
    })


  }

}
