export class GiftData {
  gift: string;
  addedTime: string;
  description: string;
  desiredRating: number;
  recieveTime: string;
  recieved: boolean;
  whereToBuy: string;

  constructor(gift: string = "unknown",
  addedTime: string = "2017-01-01",
  description: string = "unkowen",
  desiredRating: number = 0,
  recieveTime: string = "unknown",
  recieved: boolean = false,
  whereToBuy: string = "unknown") {
      this.gift = gift;
      this.addedTime = addedTime;
      this.description = description;
      this.desiredRating = desiredRating;
      this.recieveTime = recieveTime;
      this.recieved = recieved;
      this.whereToBuy = whereToBuy;
    }
}
