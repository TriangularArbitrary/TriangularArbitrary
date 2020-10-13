import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopTenComponent } from './top-ten/top-ten.component';
import { ConversionComponent } from './conversion/conversion.component';
import { AdminAccountManagementComponent } from './admin-account-management/admin-account-management.component';
import {SearchComponent } from './search/search.component';
import {FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: 'create-ticket', component: CreateTicketComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: 'admin', component: AdminAccountManagementComponent },
  { path: 'top-ten', component: TopTenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
