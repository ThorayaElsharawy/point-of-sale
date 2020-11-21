import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UnitEditComponent } from 'src/app/unit/unit-edit/unit-edit.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UnitService } from 'src/app/services/unit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unit-create',
  templateUrl: './unit-create.component.html',
  styleUrls: ['./unit-create.component.scss']
})
export class UnitCreateComponent implements OnInit {

  form;

  constructor(private _fb: FormBuilder,
    private _unitServices: UnitService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UnitEditComponent>,
    private _router: Router) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      description: []
    })

  }

  onCreateUnit() {
    let body = this.form.value;
    this._unitServices.createUnits(body).subscribe(response => {
      this._snackBar.open('Added successfully', '', { duration: 4000 });
      this.dialogRef.close();
      this.redirectTo('/units')
    })
  }

  redirectTo(uri: string) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate([uri]));
  }
}
