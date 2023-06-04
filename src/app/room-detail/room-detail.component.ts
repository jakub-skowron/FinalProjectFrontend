import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room | undefined;
  newReservation: Reservation = new Reservation(0, '', new Date(), new Date());
  updatedName: string = '';
  updatedIdentifier: string = '';
  updatedLevel: number = 0;
  updatePlaces: { SITTING: number, STANDING: number } = { SITTING: 0, STANDING: 0 };
  levels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  updatedAvailability: boolean | undefined;
  roomId: number = 0;
  errorMessage: string | undefined;
  isErrorMessageVisible: boolean = false;
  reservationErrorMessage: string | undefined;
  isReservationErrorMessageVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRoom();
    const refresh = this.route.snapshot.queryParamMap.get('refresh');

    if (refresh === 'true') {
      window.location.reload();
    }

    this.updatedLevel = this.room?.level || 0;
  }

  goBack(): void {
    this.router.navigate([''], { queryParams: { refresh: 'true' } });
  }

  getRoom(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id_room')!, 10);
    this.roomService.getRoom(id).subscribe((room) => {
      this.room = room;
      this.updatedName = room.name;
      this.updatedIdentifier = room.identifier;
      this.updatedLevel = room.level;
      this.updatePlaces = { ...room.places };
      this.updatedAvailability = room.availability;
    });
  }

  resetForm(): void {
    this.newReservation = new Reservation(0, '', new Date(), new Date());
  }

  createReservation(): void {
    if (
      this.room &&
      this.newReservation.startReservationDateTime &&
      this.newReservation.endReservationDateTime
    ) {
      this.newReservation.roomId = parseInt(
        this.route.snapshot.paramMap.get('id_room')!,
        10
      );

      this.reservationService
        .createReservation(this.newReservation)
        .subscribe(() => {
          this.resetForm();
        },
          (error) => {
            if (error.status && error.statusText) {
              this.reservationErrorMessage = `${error.error}`;
            } else {
              this.reservationErrorMessage = 'An error occurred.';
            }
            this.showRoomErrorMessage();
            this.hideRoomErrorMessageAfterDelay(2200);
          });
    }
  }

  hideErrorMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.hideErrorMessage();
    }, delay);
  }

  hideRoomErrorMessageAfterDelay(delay: number): void {
    setTimeout(() => {
      this.hideRoomErrorMessage();
    }, delay);
  }

  saveRoom(): void {
    if (
      this.room &&
      this.updatedName &&
      this.updatedIdentifier &&
      this.updatePlaces
    ) {
      this.room.organizationId = parseInt(
        this.route.snapshot.paramMap.get('id')!,
        10
      );
      this.room.name = this.updatedName;
      this.room.identifier = this.updatedIdentifier;
      this.room.level = this.updatedLevel;
      this.room.places = {
        SITTING: this.updatePlaces.SITTING,
        STANDING: this.updatePlaces.STANDING
      };
      this.room.availability = this.updatedAvailability || false;
      this.roomService.updateRoom(this.room.id, this.room).subscribe(() => {
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

  showErrorMessage(): void {
    this.isErrorMessageVisible = true;
  }

  hideErrorMessage(): void {
    this.isErrorMessageVisible = false;
  }

  showRoomErrorMessage(): void {
    this.isReservationErrorMessageVisible = true;
  }

  hideRoomErrorMessage(): void {
    this.isReservationErrorMessageVisible = false;
  }
}
