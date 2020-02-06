import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { LoginComponent } from './login/login.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { ChartComponent } from './chart/chart.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ApiInterceptor } from './services/APIinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    CustomerListComponent,
    AccountListComponent,
    TransactionListComponent,
    LoginComponent,
    BillListComponent,
    ChartComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'customer-list', component: CustomerListComponent },
      { path: 'account-list/:id', component: AccountListComponent },
      { path: 'transaction-list/:id', component: TransactionListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'bill-list/:id', component: BillListComponent },
      { path: 'chart', component: ChartComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent }

    ])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
