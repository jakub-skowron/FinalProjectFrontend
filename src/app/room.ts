import { Reservation } from "./reservation";

export class Room {
    "id": number;
    "name": string;
    "identifier": string;
    "level": number;
    "availability": boolean;
    "places": {
      "SITTING": number,
      "STANDING": number
  };
    "organizationId": number; 
    "reservations": Reservation[];

    constructor(id: number, name: string, identifier: string, level: number, places: {"SITTING":number,
"STANDING": number}) {
        this.id = id;
        this.name = name;
        this.identifier = identifier;
        this.level = level;
        this.places = places;
      }
}