import { Observable } from 'rxjs';
import { ProductService, Product } from 'src/app/services/product.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'price',
    'typeId',
    'unitId',
    'barcode',
    'brandId',
    'quantity',
    'categoryId',
    'description',
    'createdAt',
    'updatedAt',
    'actions'
  ];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _productService: ProductService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    combineLatest([
      this._route.paramMap,
      this._route.queryParamMap
    ]).pipe(
      switchMap(combined => {
        console.log(combined[0])
        console.log(combined[1])
        return this._productService.getProducts()
      })).subscribe(product => {
        this.dataSource.data = product;
        console.log(product)
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

}

