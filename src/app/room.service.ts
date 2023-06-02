import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room } from './room';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private createRoomUrl = "http://localhost:8080/rooms";
  private getRoomsUrl = "http://localhost:8080/rooms";

  constructor(private http:HttpClient) { }

  createRoom(room: Room): Observable<void> {
    return this.http.post<void>(this.createRoomUrl, room, httpOptions);
  }

  addRoom(room: Room): Observable<any> {
    return this.http.post(
      this.createRoomUrl,
      room,
      httpOptions
    );
    }

    getRooms(): Observable<Room[]> {
      return this.http.get<Room[]>(this.getRoomsUrl, httpOptions);
    }
}
