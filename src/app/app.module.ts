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
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './service/auth.service';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { StockService } from './service/stock.service';
import { SseService } from './service/sse.service';
import { BuyShareComponent } from './stocks/buy-share/buy-share.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TradeService } from './service/trade.service';
import "@angular/compiler";
import { UserService } from './service/user.service';
import { ReportComponent } from './report/report.component';
import { LogoutDialogComponent } from './dialog/logout-dialog/logout-dialog.component';
import { SharesService } from './service/shares.service';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { AddCardDialogComponent } from './dialog/add-card-dialog/add-card-dialog.component';
import { CardsService } from './service/cards.service';
import { BuyShareDialogComponent } from './dialog/buy-share-dialog/buy-share-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StockListComponent,
    BuyShareComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    ReportComponent,
    LogoutDialogComponent,
    PaymentDetailsComponent,
    AddCardDialogComponent,
    BuyShareDialogComponent
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
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    AuthService, 
    StockService,
    SseService,
    TradeService,
    UserService,
    SharesService,
    CardsService
  ],
  entryComponents: [LogoutDialogComponent, AddCardDialogComponent, BuyShareDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
