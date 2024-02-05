import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

export interface Header {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  cors: {} = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Expose-Headers': '*',
  };

  constructor(private _http: HttpClient, private _coreservice: CoreService) { }

  getQuery<T>(
    path: string,
    headers?: Header[],
    isFull: boolean = false
  ): Observable<T> {
    let URL = '';

    if (isFull) URL = path;
    else URL = `${this._coreservice.urlServicesBD}/${path}`;

    let finalHeaders: any = new HttpHeaders(this.cors);
    headers?.forEach(({ key, value }: Header) => {
      finalHeaders = finalHeaders.append(key, value);
    });
    return this._http.get<T>(URL, { headers: finalHeaders });
  }

  postQuery<T>(
    path: string,
    postData?: any,
    headers?: Header[],
    isFull: boolean = false
  ): Observable<T> {
    let URL = '';

    if (isFull) URL = path;
    else URL = `${this._coreservice.urlServicesBD}/${path}`;

    let finalHeaders: any = new HttpHeaders(this.cors);
    headers?.forEach(({ key, value }: Header) => {
      finalHeaders = finalHeaders.append(key, value);
    });

    return this._http.post<T>(URL, postData, { headers: finalHeaders });
  }

  updQuery<T>(path: string, Data?: any, headers?: Header[]): Observable<T> {
    const URL = `${this._coreservice.urlServicesBD}/${path}`;
    let finalHeaders: any = new HttpHeaders(this.cors);
    headers?.forEach(({ key, value }: Header) => {
      finalHeaders = finalHeaders.append(key, value);
    });
    return this._http.patch<T>(URL, Data, { headers: finalHeaders });
  }

  delQuery<T>(path: string, data?: any, headers?: Header[]): Observable<T> {
    const URL = `${this._coreservice.urlServicesBD}/${path}`;
    let finalHeaders: any = new HttpHeaders(this.cors);
    headers?.forEach(({ key, value }: Header) => {
      finalHeaders = finalHeaders.append(key, value);
    });
    return this._http.delete<T>(URL, { headers: finalHeaders });
  }
}
