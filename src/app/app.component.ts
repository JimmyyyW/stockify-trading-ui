import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './dialog/logout-dialog/logout-dialog.component';

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
    private router: Router,
    public dialog: MatDialog){
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

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '250px',
      data: { yes: 'yes', no: 'no'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('logout dialog closed');
      if (result == 'yes') {
        this.logout();
      }
    });
  }

}
