import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, Pipe } from '@angular/core';
import { OnInit } from '@angular/core';
import { GiftData } from './giftdata';
import { GiftHttpService } from '../providers/gift.httpService';
import { GiftFirebaseService } from '../providers/gift.firebaseService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { GiftStatus } from './gift-status'

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
    this.editingGift.Title = false;
    this.editingGift.Description = false;
    this.editingGift.PictureURL = false;
    this.newGift = new GiftData();
    this.route.params
      .switchMap((params: Params) => this.getGifts(params['person'], 'firebase'))
      .subscribe(gifts => {
        console.log("giftsdata are " + JSON.stringify(gifts));
        this.giftsdata = gifts;
      });
  }


  giftsdata: GiftData[];
  giftsFirebase: FirebaseObjectObservable<any>;
  giftsFirebaseList: FirebaseListObservable<any>;

  addingGift: boolean;
  newGift: GiftData;
  editingGift: GiftStatus = new GiftStatus();



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
    this.giftFirebaseService.addGift({
      "added-time": newGift.addedTime,
      "description": newGift.description,
      "pictureURL": newGift.pictureURL,
      "desired-rating": newGift.desiredRating,
      "recieve-time": newGift.recieveTime,
      "recieved": newGift.recieved,
      "where-to-buy": newGift.whereToBuy
    });
    this.addingGift = false;
  }

  cancel(newGift: GiftData): void {
    console.log("Canceling adding gift with the data: " + JSON.stringify(newGift));
    this.addingGift = false;
  }

  expandAddingGift(): void {
    this.addingGift = true;

  }

  editSwitch(status: GiftStatus): void {
    this.editingGift = status;
  }

  editSwitchTitle(title: boolean) :void {
    this.editingGift.Title = title
  }

  editSwitchDescription(description: boolean) :void {
    this.editingGift.Description = description
  }

  editSwitchPictureURL(pictureURL: boolean) :void {
    this.editingGift.PictureURL = pictureURL
  }



  delete(gift: GiftData) {
    console.log("Deleting gift with the data: " + JSON.stringify(gift));
    this.giftFirebaseService.removeGift(gift);
  }

  updateGift(updateGift: GiftData): void {
    console.log("Updating gift  with the data: " + JSON.stringify(updateGift.gift));
    this.giftFirebaseService.updateGift(updateGift.gift,
      {
        "added-time": updateGift.addedTime,
        "description": updateGift.description,
        "pictureURL": updateGift.pictureURL,
        "desired-rating": updateGift.desiredRating,
        "recieve-time": updateGift.recieveTime,
        "recieved": updateGift.recieved,
        "where-to-buy": updateGift.whereToBuy
      });
    //reset editing status after update
    this.editSwitch({
      Title: false,
      Description: false,
      PictureURL: false
    });
  }

  errorHandler(event) {
    console.log(event);
  }

}
