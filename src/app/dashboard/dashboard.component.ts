import { GiftesComponent } from './../gifts/gifts.component';
import { Component, OnInit} from '@angular/core';
import { Gift } from '../gifts/gift';
import {GiftHttpService} from '../providers/gift.httpService';

@Component({
  selector: 'gifts-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit {
  gifts: Gift[] = [];
  constructor(private giftService:GiftHttpService) {

  }
  ngOnInit(): void {
    this.giftService.getGiftes()
      .then(gifts => this.gifts = gifts.slice(1, 4));
  }

}
