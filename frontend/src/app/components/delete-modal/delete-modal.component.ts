import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as newsPageActions from '../../store/news/actions/news-page.actions';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newsID: number },
    private store: Store
  ) {}

  onClose() {
    this.dialogRef.close();
  }

  onDelete() {
    this.store.dispatch(
      newsPageActions.deleteNews({ newsID: this.data.newsID })
    );
    this.dialogRef.close();
  }
}
