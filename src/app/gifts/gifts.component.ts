import { FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {Gift} from './gift';
import { GiftHttpService } from '../providers/gift.httpService';
import { GiftFirebaseService } from '../providers/gift.firebaseService';
import { Router } from '@angular/router';


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
    this.getFirebaseGiftes();
  }

  gifts: Gift[] = [];
  giftsFirebase: FirebaseListObservable<any>;
  selectedGift: Gift;

  constructor(
    private router: Router,
    private giftService: GiftHttpService,
    private giftFirebaseService: GiftFirebaseService) {};

  getGiftes(): void {
    this.giftService.getGiftes().then(gifts => this.gifts = gifts);
  }

  getFirebaseGiftes(): void {
    this.giftsFirebase = this.giftFirebaseService.getGiftes();
    this.giftsFirebase.subscribe(gifts => {
      console.log("gift is "+ JSON.stringify(gifts));
      this.gifts = gifts;
      console.log("gifts is "+ JSON.stringify(this.gifts));
    });
  }

  onSelect(gift:Gift): void {
    this.selectedGift = gift;
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedGift.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {return;}
    this.giftService.create(name)
      .then(gift => {
          this.gifts.push(gift);
          this.selectedGift = null;
      });
  }

  delete(gift: Gift): void {
    this.giftService
      .delete(gift.id)
      .then(() => {
        this.gifts = this.gifts.filter(h => h !== gift);
        if (this.selectedGift ===gift) {this.selectedGift = null;}
      });

  }
}
