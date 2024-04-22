import { Component, Input } from '@angular/core';
import INews from 'src/app/core/interfaces/INews';
import { NewsModalComponent } from '../../news-modal/news-modal.component';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent {
  @Input() singleNews?: INews;

  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(DeleteModalComponent, {
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
      autoFocus: false,
      data: { newsID: this.singleNews?.id },
    });
  }

  openUpdateDialog() {
    this.dialog.open(NewsModalComponent, {
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
      autoFocus: false,
      data: { level: this.singleNews },
    });
  }
}
