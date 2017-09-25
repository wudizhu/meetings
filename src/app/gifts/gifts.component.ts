import { SearchFilter } from './../pipes/search.pipe';
// import { Logger } from './../providers/logger.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, Pipe } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { GiftData } from './giftdata';
import { GiftHttpService } from '../providers/gift.httpService';
import { GiftFirebaseService} from '../providers/gift.firebaseService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { GiftStatus } from './gift-status'
import { Logger } from "app/providers/logger.service";



@Component({
  selector: 'gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css'],

})



export class GiftesComponent implements AfterViewInit, OnInit {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logger.log("loading gifts!");
    this.addingGift = false;
    this.editingGift.PictureURL = false;
    this.newGift = new GiftData();
    this.route.params
      .switchMap((params: Params) => this.getGifts(params['person'], 'firebase', false))
      .subscribe(gifts => {
        this.logger.log("giftsdata are " + JSON.stringify(gifts));
        this.giftsdata = gifts;
      });
  }

  ngAfterViewInit() {}


  giftsdata: GiftData[];
  giftsFirebase: FirebaseObjectObservable<any>;
  giftsFirebaseList: FirebaseListObservable<any[]>;

  addingGift: boolean;
  newGift: GiftData;
  editingGift: GiftStatus = new GiftStatus();



  constructor(
    // private router: Router,
    private giftService: GiftHttpService,
    private giftFirebaseService: GiftFirebaseService,
    private route: ActivatedRoute,
    private logger: Logger) {
  };


  getGifts(person, service, recieved: boolean): FirebaseListObservable<any[]> {
    if (service != null) {
      if (service == 'firebase') {
        this.giftsFirebaseList = <FirebaseListObservable<any[]>>this.giftFirebaseService.getGifts(person, recieved)
          .map(items => {
            this.logger.log("raw object is: " + JSON.stringify(items));
            return items.map(item => {
              this.logger.log("the gift key is: " + item.$key);
              let {
                "name": name,
                "added-time": addedTime,
                "description": description,
                "pictureURL": pictureURL,
                "desired-rating": desiredRating,
                "recieve-time": recieveTime,
                "recieved": recieved,
                "where-to-buy": whereToBuy
               } = item;
              let gift = new GiftData(item.$key, name, addedTime, description, pictureURL, desiredRating, recieveTime, recieved, whereToBuy);
              return gift
            });
          });
        this.logger.log("this.giftsFirebaseList is: " + JSON.stringify(this.giftsFirebaseList));
        return this.giftsFirebaseList;
      }
    }
  }


  getAllGifts(person, service): FirebaseListObservable<any[]> {
    if (service != null) {
      if (service == 'firebase') {
        this.giftsFirebaseList = <FirebaseListObservable<any[]>>this.giftFirebaseService.getAllGifts(person)
          .map(items => {
            this.logger.log("raw object is: " + JSON.stringify(items));
            return items.map(item => {
              this.logger.log("the gift key is: " + item.$key);
              let {
                "name": name,
                "added-time": addedTime,
                "description": description,
                "pictureURL": pictureURL,
                "desired-rating": desiredRating,
                "recieve-time": recieveTime,
                "recieved": recieved,
                "where-to-buy": whereToBuy
               } = item;
              let gift = new GiftData(item.$key, name, addedTime, description, pictureURL, desiredRating, recieveTime, recieved, whereToBuy);
              return gift
            });
          });

        return this.giftsFirebaseList;
      }
    }
  }

  addGift(newGift: GiftData): void {
    this.logger.log("gift added with the data: " + JSON.stringify(newGift));
    this.giftFirebaseService.addGift({
      "name": newGift.name,
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
    this.logger.log("Canceling adding gift with the data: " + JSON.stringify(newGift));
    this.addingGift = false;
  }

  expandAddingGift(): void {
    this.addingGift = true;

  }

  editSwitch(status: GiftStatus): void {
    this.editingGift = status;
  }

  editSwitchPictureURL(pictureURL: boolean): void {
    this.editingGift.PictureURL = pictureURL
  }



  delete(gift: GiftData) {
    this.logger.log("Deleting gift with the data: " + JSON.stringify(gift));
    this.giftFirebaseService.removeGift(gift);
  }

  updateGift(updateGift: GiftData): void {
    this.logger.log("Updating gift  with the data: " + JSON.stringify(updateGift.key));
    this.giftFirebaseService.updateGift(updateGift.key,
      {
        "name": updateGift.name,
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
      PictureURL: false
    });
  }

  errorHandler(event) {
    this.logger.log(event);
  }

}
