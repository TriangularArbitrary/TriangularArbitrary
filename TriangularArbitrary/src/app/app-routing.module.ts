import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopTenComponent } from './top-ten/top-ten.component';
import { ConversionComponent } from './conversion/conversion.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import {SearchComponent } from './search/search.component';
import {FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './login/login.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { path: 'create-ticket', component: CreateTicketComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: 'admin', component: AdminAccountManagementComponent },
  { path: 'top-ten', component: TopTenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-account', component: UserAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
