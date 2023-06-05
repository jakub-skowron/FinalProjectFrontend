import { Room } from "./room";

export class Reservation {

    "id": number;
    "identifier": string;
    "startReservationDateTime": Date;
    "endReservationDateTime": Date;
    "room": Room;
    "roomId": number;
    "organizationId": number;

    constructor(identifier: string, startReservationDateTime: Date, endReservationDateTime: Date) {
            this.identifier = identifier;
            this.startReservationDateTime = startReservationDateTime;
            this.endReservationDateTime = endReservationDateTime;
          }
}
