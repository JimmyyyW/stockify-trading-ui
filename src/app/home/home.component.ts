import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  greetingMessage: string;
  id: string;
  isLoading: boolean;
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.parseUrl();
    console.log(this.id);
    this.activateUser(this.id);
    setTimeout(() => {
      this.router.navigateByUrl('/login')
      this.isLoading = false;
    }, 2000);
  }

  parseUrl() {
    return this.router.url.split('/')[2];
  }

  activateUser(url: string) {
    return this.authService.activate(url);
  }



}