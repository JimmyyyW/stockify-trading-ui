import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'stocks', component: StockListComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'stocks/:symbol', component: StockDetailComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
