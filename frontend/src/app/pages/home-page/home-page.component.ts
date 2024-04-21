import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private cookiesService: CookieService, private router: Router) {}
  ngOnInit(): void {
    if (!this.cookiesService.get('access_token')) {
      this.router.navigate(['/login']);
    }
  }
}
