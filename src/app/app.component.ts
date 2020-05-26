import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './dialog/logout-dialog/logout-dialog.component';
import { UserService } from './service/user.service';
import { Role } from './model/role.model';

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
    private userService: UserService,
    public dialog: MatDialog) {
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
      data: { yes: 'yes', no: 'no' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('logout dialog closed');
      if (result == 'yes') {
        this.logout();
      }
    });
  }

  openAdminPage() {
    let isAdmin = false;
    this.userService.getUserDetails(localStorage.getItem('username'))
      .subscribe(response => {
        response.roles.forEach(role => {
          if (role.role == 'ADMIN') {
            isAdmin = true;
          } 
        })
        if (isAdmin == true) {
          this.router.navigateByUrl('/admin');
        } else {
          alert('this page is for admin only');
        }
      });
  }
}

