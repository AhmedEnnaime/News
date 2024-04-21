import { createAction, props } from '@ngrx/store';
import INews from 'src/app/core/interfaces/INews';

export const enter = createAction('[News page] enter');

export const selectNews = createAction(
  '[News page] select news',
  props<{ newsID: number }>()
);

export const unselectNews = createAction('[News page] unselect news');

export const addNews = createAction(
  '[News page] add News',
  props<{ news: INews }>()
);

export const updateNews = createAction(
  '[News page] update News',
  props<{ news: INews; newsID: number }>()
);

export const deleteNews = createAction(
  '[News page] delete news',
  props<{ newsID: number | undefined }>()
);
