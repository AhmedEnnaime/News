import { Component, Input } from '@angular/core';
import INews from 'src/app/core/interfaces/INews';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent {
  @Input() singleNews?: INews;
}
