import { createAction, props } from '@ngrx/store';
import INews from 'src/app/core/interfaces/INews';

export const newsLoadedSuccessfully = createAction(
  '[News api] News loaded successfully',
  props<{ news: INews[] }>()
);

export const newsLoadedFailure = createAction(
  '[News api] news loaded failure',
  props<{ errors: {} }>()
);

export const newsAddedSuccessfully = createAction(
  '[News api] news added successfully',
  props<{ addedNews: INews }>()
);

export const newsAddedFailure = createAction(
  '[News api] news added failure',
  props<{ errors: {} }>()
);

export const newsUpdatedSuccessfully = createAction(
  '[News api] news updated successfully',
  props<{ updatedNews: INews }>()
);

export const newsUpdatedFailure = createAction(
  '[News api] news updated failure',
  props<{ errors: {} }>()
);

export const newsDeletedSuccessfully = createAction(
  '[News api] news deleted successfully',
  props<{ message: string; newsID: number }>()
);

export const newsDeletedFailure = createAction(
  '[News api] news deleted failure',
  props<{ errors: {} }>()
);
