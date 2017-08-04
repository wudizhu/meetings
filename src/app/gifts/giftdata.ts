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
    name: string = "name",
    addedTime: string = "2017-01-01",
    description: string = "description",
    pictureURL: string = "Copy the link of picture",
    desiredRating: number = 0,
    recieveTime: string = "time to recieve",
    recieved: boolean = false,
    whereToBuy: string = "where to buy") {
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
