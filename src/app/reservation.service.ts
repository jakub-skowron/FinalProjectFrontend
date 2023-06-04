import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reservation } from './reservation';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private createReservationUrl = "http://localhost:8080/reservations";
  private getReservationsUrl = "http://localhost:8080/reservations";
  private getReservationUrl = "http://localhost:8080/reservations/";
  private deleteReservationUrl = "http://localhost:8080/reservations/";
  private updateReservationUrl = "http://localhost:8080/reservations/";

  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.createReservationUrl, reservation, httpOptions);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(this.deleteReservationUrl + id, httpOptions);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.getReservationsUrl, httpOptions);
  }

  updateReservation(id: number, reservation: Reservation): Observable<any> {
    return this.http.put(this.updateReservationUrl + id, reservation, httpOptions);
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.getReservationUrl + id, httpOptions);
  }
}
