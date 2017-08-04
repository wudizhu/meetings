import { Logger } from './logger.service';
import { GiftData } from './../gifts/giftdata';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Gift } from '../gifts/gift';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class GiftFirebaseService {
  user: string;
  api: string;
  constructor(private angularfire: AngularFireDatabase, private logger: Logger) { }

  getGifts(person): FirebaseListObservable<any> {
    this.api =  '/gifts/' + person + '/desired-gifts';
    this.logger.log("the firebase object is : " + this.api);
    this.user = person;
    return this.angularfire.list(this.api);

  }

  addGift(newGift:any): void {
    this.logger.log("the firebase object is : " + this.api);
     this.angularfire.list(this.api).push(newGift);

  }

    updateGift(key:string, updateGift:any): void {
    this.logger.log("the firebase object is : " + this.api);
    console.log ("updating gift with key: " + key);
     this.angularfire.list(this.api).update(key, updateGift);

  }

   removeGift(gift:GiftData): void {
    this.logger.log("the firebase object is : " + this.api);
    console.log ("removing gift with key: " + gift.key);
     this.angularfire.list(this.api).remove(gift.key);

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

