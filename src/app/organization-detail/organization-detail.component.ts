import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Organization } from '../organization';
import { Room } from '../room';
import { OrganizationService } from '../organization.service';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {
  organization: Organization | undefined;
  rooms: Room[] = [];
  updatedName: string = '';
  newRoom: Room = new Room(0, '', '', 0, { "SITTING": 0, "STANDING": 0 });
  levels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  errorMessage: string | undefined;
  isErrorMessageVisible: boolean = false;
  roomErrorMessage: string | undefined;
  isRoomErrorMessageVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrganizationRooms();
    this.getOrganization();
    const refresh = this.route.snapshot.queryParamMap.get('refresh');

    if (refresh === 'true') {
      window.location.reload();
    }
  }

  loadOrganizationRooms(): void {
    if (this.organization) {
      this.rooms = this.organization.rooms;
    }
  }

  resetForm(): void {
    this.newRoom = new Room(0, '', '', 0, { "SITTING": 0, "STANDING": 0 });
  }

  getOrganization(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.organizationService.getOrganization(id)
      .subscribe(organization => this.organization = organization);
  }

  goBack(): void {
    this.router.navigate([''], { queryParams: { refresh: 'true' } });
  }

  saveOrganization(): void {
    if (this.organization && this.updatedName) {
      this.organization.name = this.updatedName;
      this.organizationService.updateOrganization(this.organization.id, this.organization)
        .subscribe(
          () => {},
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

  createRoom(): void {
    if (this.organization) {
      this.newRoom.organizationId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.roomService.createRoom(this.newRoom).subscribe(() => {
        this.loadOrganizationRooms();
        this.resetForm();
      },
      (error) => {
        if (error.status && error.statusText) {
          this.roomErrorMessage = `${error.error}`;
        } else {
          this.roomErrorMessage = 'An error occurred.';
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

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.loadOrganizationRooms();
    });
  }

  redirectToRoomDetailsPage(id: number, roomId: number): void {
    this.router.navigate(['/organizations/' + id + '/rooms/' + roomId]);
  }

  showErrorMessage(): void {
    this.isErrorMessageVisible = true;
  }

  hideErrorMessage(): void {
    this.isErrorMessageVisible = false;
  }

  showRoomErrorMessage(): void {
    this.isRoomErrorMessageVisible = true;
  }

  hideRoomErrorMessage(): void {
    this.isRoomErrorMessageVisible = false;
  }
}
