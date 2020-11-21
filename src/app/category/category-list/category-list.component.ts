import { Category, CategoryService } from './../../services/category.service';
import { CategoryCreateComponent } from './../category-create/category-create.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'description',
    'createdAt',
    'updatedAt',
    'actions'
  ];

  dataSource: MatTableDataSource<Category> = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog,
    private _categoryServices: CategoryService) { }

  ngOnInit(): void {
    this._categoryServices.getCategories().subscribe(response => {
      this.dataSource.data = response
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

  onOpenEditDialog(id) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      data: {
        id: id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onDeleteCategory(id) {
    this._categoryServices.deleteCategory(response => {

    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
