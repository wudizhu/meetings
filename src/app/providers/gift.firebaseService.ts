import { GiftData } from './../gifts/giftdata';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Gift } from '../gifts/gift';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class GiftFirebaseService {
  user: string;
  api: string;
  constructor(private angularfire: AngularFireDatabase) { }

  getGifts(person): FirebaseListObservable<any> {
    this.api =  '/gifts/' + person + '/desired-gifts';
    console.log("the firebase object is : " + this.api);
    this.user = person;
    return this.angularfire.list(this.api);

  }

  addGift(newGift:any): void {
    console.log("the firebase object is : " + this.api);
     this.angularfire.list(this.api).push(newGift);

  }

    updateGift(key:string, updateGift:any): void {
    console.log("the firebase object is : " + this.api);
    console.log ("updating gift with key: " + key);
     this.angularfire.list(this.api).update(key, updateGift);

  }

   removeGift(gift:GiftData): void {
    console.log("the firebase object is : " + this.api);
    console.log ("removing gift with key: " + gift.gift);
     this.angularfire.list(this.api).remove(gift.gift);

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

