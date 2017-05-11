import { GiftFirebaseService } from './../providers/gift.firebaseService';
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import  {GiftHttpService} from '../providers/gift.httpService';
import { Gift } from '../gifts/gift';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'gift-detail',
    templateUrl: './gift-detail.component.html',
    styleUrls: ['./gift-detail.component.css']
})

export class GiftDetailComponent implements OnInit {
    ngOnInit(): void {
      this.route.params
        .switchMap((params:Params) => this.giftService.getGift(+params['id']))
        .subscribe(gift => this.gift = gift);
    }

    constructor(
      private giftService: GiftHttpService,
      private route: ActivatedRoute,
      private location : Location
    ) {}

    goBack(): void {
      this.location.back();
    }

    save(): void {
      this.giftService.update(this.gift)
        .then(() => this.goBack());

    }

    @Input()
    gift : Gift;
}
