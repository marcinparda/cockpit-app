import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '@cockpit-app/shared-utils';
import {
  StoreEnvelope,
  StorePatchRequest,
  StoreWriteRequest,
} from 'apps/store/src/app/features/store/models/store.models';

@Injectable({
  providedIn: 'root',
})
export class StoreApiService {
  private base = `${environments.apiUrl}/api/v1/store`;

  constructor(private http: HttpClient) {}

  listPrefixes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/`);
  }

  listCategories(prefix: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/${prefix}`);
  }

  listKeys(prefix: string, category: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/${prefix}/${category}`);
  }

  getKey(
    prefix: string,
    category: string,
    key: string,
  ): Observable<StoreEnvelope> {
    return this.http.get<StoreEnvelope>(
      `${this.base}/${prefix}/${category}/${key}`,
    );
  }

  resolveKey(
    prefix: string,
    category: string,
    key: string,
  ): Observable<StoreEnvelope> {
    return this.http.get<StoreEnvelope>(
      `${this.base}/resolve/${prefix}/${category}/${key}`,
    );
  }

  putKey(
    prefix: string,
    category: string,
    key: string,
    body: StoreWriteRequest,
  ): Observable<StoreEnvelope> {
    return this.http.put<StoreEnvelope>(
      `${this.base}/${prefix}/${category}/${key}`,
      body,
    );
  }

  patchKey(
    prefix: string,
    category: string,
    key: string,
    body: StorePatchRequest,
  ): Observable<StoreEnvelope> {
    return this.http.patch<StoreEnvelope>(
      `${this.base}/${prefix}/${category}/${key}`,
      body,
    );
  }

  deleteKey(prefix: string, category: string, key: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${prefix}/${category}/${key}`);
  }
}
