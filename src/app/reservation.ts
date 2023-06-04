import { Room } from "./room";

export class Reservation {

    "id": number;
    "identifier": string;
    "startReservationDateTime": Date;
    "endReservationDateTime": Date;
    "room": Room;
    "roomId": number;

    constructor(id: number, identifier: string, startReservationDateTime: Date, endReservationDateTime: Date) {
            this.id = id;
            this.identifier = identifier;
            this.startReservationDateTime = startReservationDateTime;
            this.endReservationDateTime = endReservationDateTime;
          }
}
