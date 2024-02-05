import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-login';

  isLogged: boolean = false;
  userData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }


    this.isLogged = this.authService.isLoggedIn();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLogged = this.authService.isLoggedIn();

        localStorage.getItem('userData') ? this.userData = JSON.parse(localStorage.getItem('userData') || '{}') : this.userData = {};
      }
    });

    this.getUserData();

  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    });
  }

  getUserData() {
    console.log(this.userData);

  }


}
