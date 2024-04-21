import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NewsService } from 'src/app/services/news.service';
import * as newsPageActions from './actions/news-page.actions';
import * as newsApiActions from './actions/news.api.actions';
import { exhaustMap, map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsEffect {
  constructor(private actions$: Actions, private newsService: NewsService) {}

  loadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsPageActions.enter),
      exhaustMap(() =>
        this.newsService
          .getNews()
          .pipe(map((news) => newsApiActions.newsLoadedSuccessfully({ news })))
      )
    )
  );
}
