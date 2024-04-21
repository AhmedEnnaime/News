import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, catchError } from 'rxjs';
import IAuthReq from '../core/interfaces/IAuthReq';
import IUser from '../core/interfaces/IUser';
import IAuthRes from '../core/interfaces/IAuthRes';

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

  constructor(private http: HttpClient, private configService: ConfigService) {}

  register(user: IUser): Observable<IAuthReq> {
    return this.http
      .post<IUser>(`${this.baseUrl}/register`, user, this.httpOptions)
      .pipe(catchError((err) => this.configService.handleError(err)));
  }

  login(credentials: IAuthReq): Observable<IAuthRes> {
    return this.http
      .post<IAuthRes>(`${this.baseUrl}/login`, credentials, this.httpOptions)
      .pipe(catchError((err) => this.configService.handleError(err)));
  }
}
