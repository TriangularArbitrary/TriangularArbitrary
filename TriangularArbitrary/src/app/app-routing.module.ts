import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'create-ticket', component: CreateTicketComponent },
  // { path: 'favorites', component: FavoriteComponent },
  // { path: 'search', component: SearchComponent },
  // { path: 'conversion', component: ConversionComponent },
  // { path: 'admin-account-management', component: AdminAccountManagementComponent },
  // { path: '', component: FavoriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
