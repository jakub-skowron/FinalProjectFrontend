import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationComponent } from './organization/organization.component';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/organizations', pathMatch: 'full' },
  { path: 'organizations', component: OrganizationComponent },
  { path: 'organizations/:id', component: OrganizationDetailComponent },
  { path: 'organizations/:id/rooms/:id_room', component: RoomDetailComponent },
  { path: 'organizations/:id/rooms/:id_room/reservations/:id_reservation', component: ReservationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
