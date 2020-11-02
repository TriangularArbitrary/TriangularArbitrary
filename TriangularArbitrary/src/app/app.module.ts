import { TicketStorageService } from './Services/ticket-storage.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import { ConversionComponent } from './conversion/conversion.component';
import { TopTenComponent } from './top-ten/top-ten.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { DupeCheckDirective } from './directives/dupe-check.directive';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketComponent,
    AdminAccountManagementComponent,
    SearchComponent,
    FavoritesComponent,
    ConversionComponent,
    TopTenComponent,
    UserAccountComponent,
    LoginComponent,
    DupeCheckDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule
  ],
  providers: [
    TicketStorageService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('413592386133-89m1je7fsgf4h65unfqrct9mmnqh4pk5.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
