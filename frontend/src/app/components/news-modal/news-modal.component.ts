import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import INews from 'src/app/core/interfaces/INews';
import * as newsPageActions from '../../store/news/actions/news-page.actions';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css'],
})
export class NewsModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<NewsModalComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { news: INews }
  ) {}

  form = new FormGroup({
    title: new FormControl<string>(''),
    content: new FormControl<string>(''),
    category_id: new FormControl<number>(0),
    debut_date: new FormControl<string>(''),
    expiration_date: new FormControl<string>(''),
  });

  ngOnInit(): void {
    if (this.data.news !== undefined) {
      this.form.patchValue({
        title: this.data.news.title ?? '',
        content: this.data.news.content || '',
        category_id: this.data.news.category_id || 0,
        debut_date: this.data.news.debut_date || '',
        expiration_date: this.data.news.expiration_date || '',
      });
    }
  }

  handleNews() {
    const news: INews = {
      title: this.form.value.title ?? '',
      content: this.form.value.content ?? '',
      category_id: this.form.value.category_id ?? 0,
      debut_date: this.form.value.debut_date ?? '',
      expiration_date: this.form.value.expiration_date ?? '',
    };
    if (this.data.news !== undefined) {
      const newsID: number = this.data.news.id ?? 0;
      this.store.dispatch(newsPageActions.updateNews({ news, newsID }));
    } else {
      this.store.dispatch(newsPageActions.addNews({ news }));
    }

    this.dialogRef.close();
  }
}
