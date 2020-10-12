import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import { ConversionComponent } from './conversion/conversion.component';
import { TopTenComponent } from './top-ten/top-ten.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketComponent,
    AdminAccountManagementComponent,
    ConversionComponent,
    TopTenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
