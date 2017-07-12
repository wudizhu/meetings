import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Component, Pipe } from '@angular/core';
import { OnInit } from '@angular/core';
import { GiftData } from './giftdata';
import {Gift} from './gift';
import { GiftHttpService } from '../providers/gift.httpService';
import { GiftFirebaseService } from '../providers/gift.firebaseService';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

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

    //ToDo: get the person from the members component
    this.getGiftes(`Hongyan`, 'firebase');
  }

  gifts: Gift[];
  giftsdata: GiftData[];
  giftsFirebase: FirebaseObjectObservable<any>;
  giftsFirebaseList: FirebaseListObservable<any>;
  selectedGift: Gift;

  constructor(
    private router: Router,
    private giftService: GiftHttpService,
    private giftFirebaseService: GiftFirebaseService) { };

  getGiftes(person, service): void {
    if (service != null) {
      if (service == 'firebase') {
        this.giftsFirebaseList = <FirebaseListObservable<any>> this.giftFirebaseService.getGiftes(person)
          .map(items =>  {console.log("raw object is: " +  JSON.stringify(items));
            return items.map(item => {
              console.log("the gift key is: "+ item.$key);
              let {"added-time": addedTime,
              "description": description,
              "desired-rating": desiredRating,
              "recieve-time": recieveTime,
              "recieved": recieved,
              "where-to-buy": whereToBuy
               } = item;
              console.log(addedTime);
              let gift= new GiftData(item.$key, addedTime, description, desiredRating, recieveTime, recieved, whereToBuy);
              console.log(gift);
              return gift});
          });
        this.giftsFirebaseList.subscribe(gifts => {
          console.log("giftsdata are " + JSON.stringify(gifts));
          this.giftsdata = gifts;
        });
      } else {
        this.giftService.getGiftes().then(gifts => this.gifts = gifts);
      }
    }
  }



  get diagnostic() { return JSON.stringify(this.gifts); }


  // getFirebaseGiftesList(person): void {
  //   this.giftsFirebaseList = this.giftFirebaseService.getGiftesList(person);
  //   this.giftsFirebaseList.subscribe(gifts => {
  //     console.log("gift is "+ JSON.stringify(gifts));
  //     this.gifts = gifts;
  //   });
  // }

  onSelect(gift: Gift): void {
    this.selectedGift = gift;
  }

  // gotoDetail() {
  //   this.router.navigate(['/detail', this.selectedGift.description);
  // }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.giftService.create(name)
      .then(gift => {
        this.gifts.push(gift);
        this.selectedGift = null;
      });
  }

  delete() {

  }

  gotoDetail() {

  }

  // delete(gift: Gift): void {
  //   this.giftService
  //     .delete(gift.desiredrating)
  //     .then(() => {
  //       this.gifts = this.gifts.filter(h => h !== gift);
  //       if (this.selectedGift === gift) { this.selectedGift = null; }
  //     });

  // }
}
