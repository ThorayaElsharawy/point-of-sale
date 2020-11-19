import { UnitEditComponent } from './../unit-edit/unit-edit.component';
import { UnitService } from './../../services/unit.service';
import { UnitCreateComponent } from 'src/app/unit/unit-create/unit-create.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unit } from 'src/app/services/unit.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  dataSource: MatTableDataSource<Unit> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _unitServices: UnitService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._unitServices.getUnits().subscribe(response => {
      this.dataSource.data = response;
      console.log(response)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onOpenEditDialog(id, name) {
    // console.log(id, name);
    const dialogRef = this.dialog.open(UnitEditComponent, {
      data: {
        id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onDeleteUnit(id) {
    this._unitServices.deleteUnit(id).subscribe(response => {
      console.log(response)
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UnitCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
