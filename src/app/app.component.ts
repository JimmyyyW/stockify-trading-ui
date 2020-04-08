import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'stockify';
  loggedIn = false;
  username: string;

  constructor(private authService: AuthService,
    private router: Router){
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
    }

  ngOnInit(): void {
    this.username = this.authService.username.value;
    if (this.username) {
      this.loggedIn = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login').then(() => window.location.reload());
  }

}
