import { Router } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from 'src/app/services/unit.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  form;
  constructor(private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unit,
    private _router: Router) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      description: []
    })

    this._categoryService.getCategories().subscribe(response => {
      console.log()
      for (let i = 0; i < response.length; i++) {
        if (response[i].id === this.data.id) {
          this.form.patchValue(response[i]);
        }
      }
    })
  }

  onEditCategory() {
    this._categoryService.editCategory(this.data.id, this.form.value).subscribe(response => {
      console.log(response)
      this._snackBar.open('Updated successfully', '', { duration: 4000 });
      this.dialogRef.close();
      this.redirectTo('/categories')

    })
  }

  redirectTo(uri: string) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate([uri]));
  }

}
