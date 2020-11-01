import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  brandId: string;
  categoryId: string;
  description: string;
  name: string;
  price: number;
  quantity: number;
  salePrice: number;
  typeId: string;
  unitId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/api/v1/products';

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.url)
  }

  createProduct(product): Observable<Product> {
    return this._http.post<Product>(this.url, product).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError(error.error['message'] || 'Bad Request')
        }
        if (error.status === 404) {
          return throwError(error.error['message'] || 'Server Not Found ')

        }
        return throwError(error.message || 'Server Error ')
      })
    )
  }

}
