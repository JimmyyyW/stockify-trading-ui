import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockService } from './stock.service';
import { SseServiceService } from './sse-service.service';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { BuyShareComponent } from './buy-share/buy-share.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TradeService } from './trade.service';
import "@angular/compiler";
import { UserService } from './user.service';
import { ReportComponent } from './report/report.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockListComponent,
    StockDetailComponent,
    BuyShareComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    ReportComponent,
    LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    // MatSnackBarModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSidenavModule,
    MatDialogModule
  ],
  exports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    AuthService, 
    StockService,
    SseServiceService,
    TradeService,
    UserService
  ],
  entryComponents: [LogoutDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
