import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, catchError, tap } from 'rxjs';
import IAuthReq from '../core/interfaces/IAuthReq';
import IUser from '../core/interfaces/IUser';
import IAuthRes from '../core/interfaces/IAuthRes';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private cookieService: CookieService
  ) {}

  register(user: IUser): Observable<IAuthReq> {
    return this.http
      .post<IUser>(`${this.baseUrl}/register`, user, this.httpOptions)
      .pipe(catchError((err) => this.configService.handleError(err)));
  }

  login(credentials: IAuthReq): Observable<IAuthRes> {
    return this.http.post<IAuthRes>(`${this.baseUrl}/login`, credentials).pipe(
      catchError((err) => {
        throw err;
      }),
      tap((res) => {
        if (res.access_token) {
          this.cookieService.set('access_token', res.access_token);
        }
      })
    );
  }

  getToken() {
    return this.cookieService.get('access_token');
  }
}
