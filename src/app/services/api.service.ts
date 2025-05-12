import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = process.env['API_URL'] || 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCockpitData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
