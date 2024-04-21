import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import IUser from 'src/app/core/interfaces/IUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookiesService: CookieService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.cookiesService.get('access_token')) {
      this.router.navigate(['/']);
    }
  }
  register() {
    if (this.form.valid) {
      const user: IUser = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.authService.register(user).subscribe(
        (res) => {
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error(err);
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
