import {Room} from './room'

export class Organization {
    "id": number;
    "name": string;
    "rooms": Room[];
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
      }
}
