import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import INews from 'src/app/core/interfaces/INews';
import { selectNews } from 'src/app/store/news/news.selector';
import * as newsPageActions from '../../store/news/actions/news-page.actions';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: Observable<INews[]>;

  constructor(private store: Store) {
    this.news = store.select(selectNews);
  }
  ngOnInit(): void {
    this.store.dispatch(newsPageActions.enter());
  }
}
