import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, Pipe } from '@angular/core';
import { OnInit } from '@angular/core';
import { GiftData } from './giftdata';
import { Gift } from './gift';
import { GiftHttpService } from '../providers/gift.httpService';
import { GiftFirebaseService } from '../providers/gift.firebaseService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css'],

})



export class GiftesComponent implements OnInit {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("loading gifts!");
    this.addingGift = false;
    this.updatingGift = false;
    this.newGift = new GiftData();
    this.route.params
      .switchMap((params: Params) => this.getGifts(params['person'], 'firebase'))
      .subscribe(gifts => {
        console.log("giftsdata are " + JSON.stringify(gifts));
        this.giftsdata = gifts;
      });
  }

  gifts: Gift[];
  giftsdata: GiftData[];
  giftsFirebase: FirebaseObjectObservable<any>;
  giftsFirebaseList: FirebaseListObservable<any>;
  selectedGift: Gift;
  addingGift: boolean;
  newGift : GiftData;
  updatingGift: boolean;

  constructor(
    // private router: Router,
    private giftService: GiftHttpService,
    private giftFirebaseService: GiftFirebaseService,
    private route: ActivatedRoute) {
    };


  getGiftsByPerson(person): FirebaseListObservable<any> {

    return this.getGifts(person, 'firebase');
  }

  getGifts(person, service): FirebaseListObservable<any> {
    if (service != null) {
      if (service == 'firebase') {
        this.giftsFirebaseList = <FirebaseListObservable<any>>this.giftFirebaseService.getGifts(person)
          .map(items => {
            console.log("raw object is: " + JSON.stringify(items));
            return items.map(item => {
              console.log("the gift key is: " + item.$key);
              let { "added-time": addedTime,
                "description": description,
                "pictureURL": pictureURL,
                "desired-rating": desiredRating,
                "recieve-time": recieveTime,
                "recieved": recieved,
                "where-to-buy": whereToBuy
               } = item;
              let gift = new GiftData(item.$key, addedTime, description, pictureURL, desiredRating, recieveTime, recieved, whereToBuy);
              return gift
            });
          });

        return this.giftsFirebaseList;
      }
    }
  }

  addGift(newGift: GiftData): void {
    console.log("gift added with the data: " + JSON.stringify(newGift));
    this.giftFirebaseService.addGift({"added-time": newGift.addedTime,
                "description": newGift.description,
                "pictureURL": newGift.pictureURL,
                "desired-rating": newGift.desiredRating,
                "recieve-time": newGift.recieveTime,
                "recieved": newGift.recieved,
                "where-to-buy": newGift.whereToBuy});
    this.addingGift = false;
  }

  cancel(newGift: GiftData): void {
    console.log("Canceling adding gift with the data: " + JSON.stringify(newGift));
    this.addingGift = false;
  }

  expandAddingGift(): void {
    this.addingGift = true;

  }

  delete(gift:GiftData) {
    console.log("Deleting gift with the data: " + JSON.stringify(gift));
    this.giftFirebaseService.removeGift(gift);
    this.updatingGift = false;
  }

  updateGift(updateGift: GiftData): void {
    console.log("Updating gift  with the data: " + JSON.stringify(updateGift.gift));
    this.giftFirebaseService.updateGift( updateGift.gift,
                {
                "added-time": updateGift.addedTime,
                "description": updateGift.description,
                "pictureURL": updateGift.pictureURL,
                "desired-rating": updateGift.desiredRating,
                "recieve-time": updateGift.recieveTime,
                "recieved": updateGift.recieved,
                "where-to-buy": updateGift.whereToBuy
              });
    this.updatingGift = false;
  }

  errorHandler(event) {
    console.log(event);
  }

}
