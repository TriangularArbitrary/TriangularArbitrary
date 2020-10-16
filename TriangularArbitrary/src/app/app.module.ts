import { TicketStorageService } from './Services/ticket-storage.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import { ConversionComponent } from './conversion/conversion.component';
import { TopTenComponent } from './top-ten/top-ten.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketComponent,
    AdminAccountManagementComponent,
    SearchComponent,
    FavoritesComponent,
    ConversionComponent,
    TopTenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TicketStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
