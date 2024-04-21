import { createReducer, on } from '@ngrx/store';
import INews from 'src/app/core/interfaces/INews';
import * as newsPageActions from './actions/news-page.actions';
import * as newsApiActions from './actions/news.api.actions';

export interface NewsState {
  collection: INews[];
  selectedNewsID: number | null;
  loading: boolean;
  errors: {};
}

export const initialState: NewsState = {
  collection: [],
  selectedNewsID: null,
  loading: false,
  errors: {},
};

export const NewsReducer = createReducer(
  initialState,
  on(newsPageActions.enter, (state, action) => ({
    ...state,
    selectedNewsID: null,
    loading: true,
  })),
  on(newsPageActions.selectNews, (state, action) => ({
    ...state,
    selectedNewsID: action.newsID,
    loading: true,
  })),
  on(newsPageActions.unselectNews, (state, action) => ({
    ...state,
    selectedNewsID: null,
  })),
  on(newsApiActions.newsLoadedSuccessfully, (state, action) => ({
    ...state,
    collection: action.news,
  })),
  on(newsApiActions.newsAddedSuccessfully, (state, action) => ({
    collection: createNews(state.collection, action.addedNews),
    selectedNewsID: null,
    loading: false,
    errors: {},
  })),
  on(newsApiActions.newsUpdatedSuccessfully, (state, action) => ({
    collection: updateNews(state.collection, action.updatedNews),
    selectedNewsID: null,
    loading: false,
    errors: {},
  })),
  on(newsApiActions.newsDeletedSuccessfully, (state, action) => ({
    collection: deleteNews(state.collection, action.newsID),
    selectedNewsID: null,
    loading: false,
    errors: {},
  })),
  on(
    newsApiActions.newsLoadedFailure,
    newsApiActions.newsAddedFailure,
    newsApiActions.newsUpdatedFailure,
    newsApiActions.newsDeletedFailure,
    (state, action) => ({
      ...state,
      loading: false,
      errors: action.errors,
    })
  )
);

const createNews = (news: INews[], newNews: INews) => [...news, newNews];

const updateNews = (news: INews[], updatedNews: INews) =>
  news.map((singleNews) =>
    singleNews.id === updatedNews.id
      ? Object.assign({}, singleNews, updatedNews)
      : singleNews
  );

const deleteNews = (news: INews[], newsID: number) =>
  news.filter((singleNews) => singleNews.id != newsID);
