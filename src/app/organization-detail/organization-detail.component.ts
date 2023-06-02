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

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private roomService: RoomService,
    private router: Router
  ) { }

  loadRooms(): void {
    this.roomService.getRooms().subscribe((list: Room[]) => {
      this.rooms = list;
    });
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
        .subscribe(() => this.goBack());
    }
  }

  createRoom(id: number): void {
    this.roomService.createRoom(this.newRoom).subscribe(() => {
      this.loadRooms();
      this.resetForm();
    });
  }

  addRoomToOrganization(id: number,roomId: number): void {
    this.organizationService.addRoomToOrganization(id, roomId).subscribe(() => {
    });
  }

  deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(() => {
      this.loadRooms();
    });
  }
  
  ngOnInit(): void {
    this.getOrganization();
    this.roomService.getRooms().subscribe((list: Room[]) => {
      this.organizationService.getOrganizations().subscribe((organizations: Organization[]) => {
        const assignedRoomIds: number[] = [];
        organizations.forEach((org: Organization) => {
          org.rooms.forEach((room: Room) => {
            assignedRoomIds.push(room.id);
          });
        });
  
        const unassignedRooms = list.filter((room: Room) => {
          return !assignedRoomIds.includes(room.id);
        });
  
        this.rooms = unassignedRooms;
      });
    });
  }

  redirectToRoomDetailsPage(id: number, roomId: number): void {
    this.router.navigate(['/organizations/' + id + '/rooms/' + roomId]);
  }

}
