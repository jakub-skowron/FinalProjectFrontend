import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  errorMessage: string | undefined;
  isErrorMessageVisible: boolean = false;
  reservation: Reservation | undefined;
  updatedIdentifier: string = '';
  updatedStartReservationDateTime: Date = new Date();
  updatedEndReservationDateTime: Date = new Date();
  idNav: number = parseInt(this.route.snapshot.paramMap.get('id')!,10);
  idRoomNav: number = parseInt(this.route.snapshot.paramMap.get('id_room')!,10);

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  getReservation(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id_reservation')!, 10);
    this.reservationService.getReservation(id).subscribe((reservation) => {
      this.reservation = reservation;
      this.updatedIdentifier = reservation.identifier;
      this.updatedStartReservationDateTime = reservation.startReservationDateTime;
      this.updatedEndReservationDateTime = reservation.endReservationDateTime;
    });
  }

  saveReservation(): void {
    if (
      this.reservation &&
      this.updatedIdentifier &&
      this.updatedStartReservationDateTime &&
      this.updatedEndReservationDateTime
    ) {
      this.reservation.roomId = parseInt(
        this.route.snapshot.paramMap.get('id_room')!,
        10
      );
      this.reservation.identifier = this.updatedIdentifier;
      this.reservation.startReservationDateTime = this.updatedStartReservationDateTime;
      this.reservation.endReservationDateTime = this.updatedEndReservationDateTime;
      this.reservationService.updateReservation(this.reservation.id, this.reservation).subscribe(() => {
        window.location.reload();
      },
        (error) => {
          if (error.status && error.statusText) {
            this.errorMessage = `${error.error}`;
          } else {
            this.errorMessage = 'An error occurred.';
          }
          this.showErrorMessage();
          this.hideErrorMessageAfterDelay(2200);
        }
      );
    }
  }

  resetForm(): void {
    this.reservation = new Reservation('', new Date(), new Date());
  }

  ngOnInit(): void {
    this.getReservation();
    const refresh = this.route.snapshot.queryParamMap.get('refresh');

    if (refresh === 'true') {
      window.location.reload();
    }
  }

  goBack(): void {
    this.router.navigate(['/organizations/' + this.idNav + '/rooms/' + this.idRoomNav], 
    { queryParams: {} });
  }

  showErrorMessage(): void {
    this.isErrorMessageVisible = true;
  }

  hideErrorMessage(): void {
    this.isErrorMessageVisible = false;
  }

  hideErrorMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.hideErrorMessage();
    }, delay);
  }
}
