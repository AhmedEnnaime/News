import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NewsReducer } from './news.reducer';
import { NewsEffect } from './news.effect';

export const NEWS_FEATURE_KEY = 'NEWS';

@NgModule({
  imports: [
    StoreModule.forFeature(NEWS_FEATURE_KEY, NewsReducer),
    EffectsModule.forFeature([NewsEffect]),
  ],
})
export class NewsStateModule {}
