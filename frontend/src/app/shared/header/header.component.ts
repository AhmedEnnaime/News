import { Component, OnInit } from '@angular/core';
import { IMenuItem } from 'src/app/core/interfaces/IMenuItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuItems: IMenuItem[] = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'News',
      url: '/news',
    },
    {
      text: 'Categories',
      url: '/categories',
    },
  ];

  ngOnInit(): void {
    this.menuItems = this.menuItems.map((item: IMenuItem) => {
      return {
        ...item,
        isActive: window.location.pathname === item.url,
      };
    });
  }
}
