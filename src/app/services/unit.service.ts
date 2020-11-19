import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Unit {
  createdAt: Date;
  description: string;
  id: string;
  name: string;
  updatedAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private url = "http://localhost:8080/api/v1/units/"

  constructor(private _http: HttpClient) { }

  getUnits(): Observable<Unit[]> {
    return this._http.get<Unit[]>(this.url)
  }

  createUnits(unit): Observable<Unit> {
    return this._http.post<Unit>(this.url, unit)
  }

  editUnit(id, unit): Observable<Unit> {
    return this._http.put<Unit>(this.url + id, unit)
  }

  deleteUnit(id): Observable<Unit> {
    return this._http.delete<Unit>(this.url + id)
  }
}
