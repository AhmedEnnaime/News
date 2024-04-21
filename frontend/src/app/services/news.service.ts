import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable, catchError } from 'rxjs';
import INews from '../core/interfaces/INews';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl: string = 'http://localhost:8000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getNews(): Observable<INews[]> {
    return this.http
      .get<INews[]>(`${this.baseUrl}/news`)
      .pipe(catchError((err) => this.configService.handleError(err)));
  }

  createNews(news: INews): Observable<INews> {
    return this.http
      .post<INews>(`${this.http}/news`, news, this.httpOptions)
      .pipe(catchError((err) => this.configService.handleError(err)));
  }

  updateNews(news: INews, id: number): Observable<INews> {
    return this.http
      .put<INews>(`${this.baseUrl}/news/${id}`, news, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }

  deleteNews(id: number | undefined): Observable<string> {
    return this.http
      .delete<string>(`${this.baseUrl}/news/${id}`, this.httpOptions)
      .pipe(catchError((error) => this.configService.handleError(error)));
  }
}
