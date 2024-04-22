import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError } from 'rxjs';
import ICategory from '../core/interfaces/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:8000/api';
  accessToken = this.cookiesService.get('access_token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private cookiesService: CookieService
  ) {}

  getCategories(): Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(`${this.baseUrl}/categories`, this.httpOptions)
      .pipe(catchError((err) => this.configService.handleError(err)));
  }
}
