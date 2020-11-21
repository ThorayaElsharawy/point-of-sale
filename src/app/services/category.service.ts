import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  createdAt: Date;
  description: string;
  id: string;
  name: string;
  updatedAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _url = "http://localhost:8080/api/v1/categories/"

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(this._url)
  }

  createCategory(category): Observable<Category> {
    return this._http.post<Category>(this._url, category)
  }

  editCategory(id, category): Observable<Category> {
    return this._http.put<Category>(this._url + id, category)
  }

  deleteCategory(id): Observable<Category> {
    return this._http.delete<Category>(this._url + id)
  }
}
