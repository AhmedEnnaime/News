import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NewsService } from 'src/app/services/news.service';
import * as newsPageActions from './actions/news-page.actions';
import * as newsApiActions from './actions/news.api.actions';
import { concatMap, exhaustMap, map, mergeMap } from 'rxjs';
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

  createNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsPageActions.addNews),
      concatMap((action) =>
        this.newsService
          .createNews(action.news)
          .pipe(
            map((addedNews) =>
              newsApiActions.newsAddedSuccessfully({ addedNews })
            )
          )
      )
    )
  );

  updateNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsPageActions.updateNews),
      concatMap((action) =>
        this.newsService
          .updateNews(action.newsID, action.news)
          .pipe(
            map((updatedNews) =>
              newsApiActions.newsUpdatedSuccessfully({ updatedNews })
            )
          )
      )
    )
  );

  deleteNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newsPageActions.deleteNews),
      mergeMap((action) =>
        this.newsService.deleteNews(action.newsID).pipe(
          map((response) =>
            newsApiActions.newsDeletedSuccessfully({
              message: response.message,
              newsID: response.deletedElementIdentifier,
            })
          )
        )
      )
    )
  );
}
