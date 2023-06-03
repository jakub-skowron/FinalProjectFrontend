import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit  {
  room: Room | undefined;
  updatedName: string = '';
  updatedIdentifier: string = '';
  updatedLevel: number = 0;
  updatePlaces: { SITTING: number, STANDING: number } = { SITTING: 0, STANDING: 0 };
  levels: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  updatedAvailability: boolean | undefined;


  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router
  ) { }

  goBack(): void {
    this.router.navigate([''], { queryParams: { refresh: 'true' } });
  }

  getRoom(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id_room')!, 10);
    this.roomService.getRoom(id)
      .subscribe(room => {
        this.room = room;
        this.updatedName = room.name;
        this.updatedIdentifier = room.identifier;
        this.updatedLevel = room.level;
        this.updatePlaces = { ...room.places };
        this.updatedAvailability = room.availability;
      });
  }

  saveRoom(): void {
    if (this.room && this.updatedName && this.updatedIdentifier && this.updatePlaces && this.updatedAvailability) {
      this.room.organizationId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.room.name = this.updatedName;
      this.room.identifier = this.updatedIdentifier;
      this.room.level = this.updatedLevel;
      this.room.places = {SITTING:this.updatePlaces.SITTING, STANDING:this.updatePlaces.STANDING};
      this.room.availability = this.updatedAvailability;
      this.roomService.updateRoom(this.room.id, this.room)
        .subscribe(() => this.goBack());
    }
  }

  ngOnInit(): void {
    this.getRoom();
    const refresh = this.route.snapshot.queryParamMap.get('refresh');
  
    if (refresh === 'true') {
      window.location.reload();
    }
  
    this.updatedLevel = this.room?.level || 0;
  }
}
