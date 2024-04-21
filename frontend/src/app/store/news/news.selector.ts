import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NewsState } from './news.reducer';
import { NEWS_FEATURE_KEY } from './news.state.module';

export const selectNewsState =
  createFeatureSelector<NewsState>(NEWS_FEATURE_KEY);

const getAllNews = (state: NewsState) => state.collection;
const getSelectedNewsID = (state: NewsState) => state.selectedNewsID;
const getErrors = (state: NewsState) => state.errors;
const getLoadingState = (state: NewsState) => state.loading;

const getSelectedNews = createSelector(
  getAllNews,
  getSelectedNewsID,
  (news, selectedNewsID) =>
    news.find((singleNews) => singleNews.id === selectedNewsID) ?? null
);

export const selectNews = createSelector(selectNewsState, getAllNews);

export const selectSelectedNewsID = createSelector(
  selectNewsState,
  getSelectedNewsID
);

export const selectSelectedNews = createSelector(
  selectNewsState,
  getSelectedNews
);

export const selectLoadingState = createSelector(
  selectNewsState,
  getLoadingState
);

export const selectErrorState = createSelector(selectNewsState, getErrors);
