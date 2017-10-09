export class GiftData {
  key: string;
  name: string;
  addedTime: string;
  description: string;
  pictureURL: string;
  desiredRating: number;
  recieveTime: string;
  recieved: boolean;
  whereToBuy: string;

  constructor(
    key: string = "key",
    name: string = "",
    addedTime: string = "",
    description: string = "",
    pictureURL: string = "",
    desiredRating: number = 0,
    recieveTime: string = "",
    recieved: boolean = false,
    whereToBuy: string = "") {
    this.key = key;
    this.name = name;
    this.addedTime = addedTime;
    this.description = description;
    this.pictureURL = !pictureURL ? "assets/images/placeholder.png" : pictureURL;
    this.desiredRating = desiredRating;
    this.recieveTime = recieveTime;
    this.recieved = recieved;
    this.whereToBuy = whereToBuy;
  }



}
