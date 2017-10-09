import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { SearchFilter } from "./../pipes/search.pipe";
import {
  FirebaseListObservable
} from "angularfire2/database";
import { Component, Pipe } from "@angular/core";
import { OnInit } from "@angular/core";
import { GiftData } from "./giftdata";
import { GiftHttpService } from "../providers/gift.httpService";
import { GiftFirebaseService } from "../providers/gift.firebaseService";
import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { GiftStatus } from "./gift-status";
import { Logger } from "app/providers/logger.service";
import { Filter } from "app/gifts/filter";


@Component({
  selector: "gifts",
  templateUrl: "./gifts.component.html",
  styleUrls: ["./gifts.component.css"]
})
export class GiftesComponent implements OnInit {
  status: boolean = true;
  giftsdata: GiftData[];
  giftsFirebaseList: FirebaseListObservable<GiftData[]>;
  // giftsList: Observable<GiftData[]>;

  private searchTerms = new Subject<Filter>();

  addingGift: boolean;
  searchingGifts: boolean;
  newGift: GiftData;
  editingGift: GiftStatus = new GiftStatus();
  user: string;

  //push a search term into the observable stream.
  search(term: string, recieved: boolean): void {
    this.logger.log("The search term is : " + term, recieved);
    this.searchTerms.next({ searchTerm: term, giftRecieved: recieved });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logger.log("loading gifts!");
    this.addingGift = false;
    this.searchingGifts = false;
    this.editingGift.PictureURL = false;
    this.newGift = new GiftData();



    this.route.params
      .switchMap((params: Params) => this.getAllGifts('Hongyan', 'firebase'))
      .subscribe(gifts => {
        this.logger.log("giftsdata are " + JSON.stringify(gifts));
        this.giftsdata = gifts
          .filter(item => {
            if (item.status === null || item.status === undefined) {
              return false;
            } else {
              this.logger.log("status :" + item.status, !!item.status);
              return (!!item.status === this.status) ? true : false;
            }
          });
      });


    this.searchTerms
      .debounceTime(300) // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged() // ignore if next search term is same as previous
      .switchMap((term // switch to new observable each time the term changes
      ) => this.getSearchedGifts(this.user ? this.user : "unknown", "firebase", term)
      )
      .subscribe(gifts => {
        this.logger.log("giftsdata are " + JSON.stringify(gifts));
        this.giftsdata = gifts;
      });

  }


  constructor(
    // private router: Router,
    private giftService: GiftHttpService,
    private giftFirebaseService: GiftFirebaseService,
    private route: ActivatedRoute,
    private logger: Logger,
  ) { }

  getGifts(
    person,
    service,
    recieved: boolean
  ): FirebaseListObservable<GiftData[]> {
    if (service != null) {
      if (service == "firebase") {
        this.giftsFirebaseList = <FirebaseListObservable<
          GiftData[]
          >>this.giftFirebaseService.getGifts(person, recieved).map(items => {
            this.logger.log("raw object is: " + JSON.stringify(items));
            return items.map(item => {
              this.logger.log("the gift key is: " + item.$key);
              let {
                key: key,
                time: time,
                description: description,
                speaker: speaker,
                PictureURL: speakerPictureURL,
                speakerlink: speakerlink,
                status: status
            } = item;
              let gift = new GiftData(
                item.$key,
                time,
                description,
                speaker,
                speakerPictureURL,
                speakerlink,
                status
              );
              return gift;
            });
          });
        this.logger.log(
          "this.giftsFirebaseList is: " + JSON.stringify(this.giftsFirebaseList)
        );
        return this.giftsFirebaseList;
      }
    }
  }

  getSearchedGifts(person, service, filter: Filter): FirebaseListObservable<GiftData[]> {
    if (service != null) {
      if (service == "firebase") {
        this.logger.log("The current user is :" + person);
        this.giftsFirebaseList = <FirebaseListObservable<
          GiftData[]
          >>this.giftFirebaseService.getAllGifts(person).map(items => {
            this.logger.log("raw object is: " + JSON.stringify(items));
            return items.map(item => {
              this.logger.log("the gift key is: " + item.$key);
              let {
                key: key,
                time: time,
                description: description,
                speaker: speaker,
                PictureURL: speakerPictureURL,
                speakerlink: speakerlink,
                status: status
            } = item;
              let gift = new GiftData(
                item.$key,
                time,
                description,
                speaker,
                speakerPictureURL,
                speakerlink,
                status
              );
              return gift;
            }).filter(gift => { return filter.searchTerm ? gift.name.toLowerCase().includes(filter.searchTerm) : true && (filter.giftRecieved == gift.recieved) });
          });

        return this.giftsFirebaseList;
      }
    }
  }

  getAllGifts(person, service): FirebaseListObservable<GiftData[]> {
    this.logger.log("The current user is :" + person);
    this.user = person; //set the user for future calls within the same route
    if (service != null) {
      if (service == "firebase") {
        this.giftsFirebaseList = <FirebaseListObservable<
          GiftData[]
          >>this.giftFirebaseService.getAllGifts(person).map(items => {
            this.logger.log("raw object is: " + JSON.stringify(items));
            return items.map(item => {
              this.logger.log("the gift key is: " + item.$key);
              let {
                time: time,
                description: description,
                speaker: speaker,
                PictureURL: speakerPictureURL,
                speakerlink: speakerlink,
                status: status
            } = item;
              let gift = new GiftData(
                item.$key,
                time,
                description,
                speaker,
                speakerPictureURL,
                speakerlink,
                status
              );
              return gift;
            });
          });

        return this.giftsFirebaseList;
      }
    }
  }

  // addGift(newGift: GiftData): void {
  //   this.status = false;
  //   this.search(null, this.status);
  //   this.logger.log("gift added with the data: " + JSON.stringify(newGift));
  //   this.giftFirebaseService.addGift({
  //     name: newGift.name,
  //     "added-time": newGift.addedTime,
  //     description: newGift.description,
  //     pictureURL: newGift.pictureURL,
  //     "desired-rating": newGift.desiredRating,
  //     "recieve-time": newGift.recieveTime,
  //     recieved: newGift.recieved,
  //     "where-to-buy": newGift.whereToBuy
  //   });
  //   this.addingGift = false;
  //   this.newGift = new GiftData();
  // }

  // cancel(newGift: GiftData): void {
  //   this.logger.log(
  //     "Canceling adding gift with the data: " + JSON.stringify(newGift)
  //   );
  //   this.addingGift = false;
  // }

  // expandAddingGift(): void {
  //   this.addingGift = true;
  // }
  // expandSearchingGift(): void {
  //   this.searchingGifts = true;
  //   this.status = false;
  //   this.search(null, this.status);

  // }

  // exitSearch(): void {
  //   this.searchingGifts = false;
  //   this.status = false;
  //   this.search(null, this.status);
  // }

  // editSwitch(status: GiftStatus): void {
  //   this.editingGift = status;
  // }

  // editSwitchPictureURL(pictureURL: boolean): void {
  //   this.editingGift.PictureURL = pictureURL;
  // }

  // delete(gift: GiftData) {
  //   this.logger.log("Deleting gift with the data: " + JSON.stringify(gift));
  //   this.giftFirebaseService.removeGift(gift);
  // }

  // updateGift(updateGift: GiftData): void {
  //   this.logger.log(
  //     "Updating gift  with the data: " + JSON.stringify(updateGift)
  //   );
  //   this.giftFirebaseService.updateGift(updateGift.key, {
  //     name: updateGift.name,
  //     "added-time": updateGift.addedTime,
  //     description: updateGift.description,
  //     pictureURL: updateGift.pictureURL,
  //     "desired-rating": updateGift.desiredRating,
  //     "recieve-time": updateGift.recieveTime,
  //     recieved: updateGift.recieved,
  //     "where-to-buy": updateGift.whereToBuy
  //   });
  //   //reset editing status after update
  //   this.editSwitch({
  //     PictureURL: false
  //   });
  // }

  errorHandler(event) {
    this.logger.log(event);
  }
}
