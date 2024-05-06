import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersApiService {

  constructor(
    private readonly _http: HttpClient
) {}

LoadFeatureCollection(): Observable<any> {
  return this._http.get('assets/export_draw_30_04_2024.json');
}

}
