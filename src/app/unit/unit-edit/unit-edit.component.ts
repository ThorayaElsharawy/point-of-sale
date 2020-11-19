import { Unit } from './../../services/unit.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UnitService } from 'src/app/services/unit.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss']
})
export class UnitEditComponent implements OnInit {

  form;

  constructor(private _fb: FormBuilder,
    private _unitServices: UnitService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UnitEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Unit) { }


  ngOnInit(): void {

    this.form = this._fb.group({
      name: ['', Validators.required],
      description: []
    })

    this._unitServices.getUnits().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].id === this.data.id) {
          this.form.patchValue(response[i]);
        }
      }
    })
  }

  onEditUnit() {
    console.log(this.data.id)
    this._unitServices.editUnit(this.data.id, JSON.stringify(this.form.value)).subscribe(response => {
      console.log(response)
      this._snackBar.open('Updated successfully', '', { duration: 4000 });
      this.dialogRef.close();

    })
  }

}
