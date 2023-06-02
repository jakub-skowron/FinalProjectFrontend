export class Room {
    "id": number;
    "name": string;
    "identifier": string;
    "level": number;
    "places": {
      "SITTING": number,
      "STANDING": number
  };
    constructor(id: number, name: string, identifier: string, level: number, places: {"SITTING":number,
"STANDING": number}) {
        this.id = id;
        this.name = name;
        this.identifier = identifier;
        this.level = level;
        this.places = places;
      }
}