import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import INews from 'src/app/core/interfaces/INews';
import { selectNews } from 'src/app/store/news/news.selector';
import * as newsPageActions from '../../store/news/actions/news-page.actions';
import { NewsModalComponent } from '../news-modal/news-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: Observable<INews[]>;

  constructor(private store: Store, public dialog: MatDialog) {
    this.news = store.select(selectNews);
  }

  openDialog() {
    this.dialog.open(NewsModalComponent, {
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
      autoFocus: false,
      data: { news: undefined },
    });
  }

  ngOnInit(): void {
    this.store.dispatch(newsPageActions.enter());
  }
}
