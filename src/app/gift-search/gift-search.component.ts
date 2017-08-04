import { Logger } from './../providers/logger.service';
import { Component, OnInit} from '@angular/core';
import { Gift } from '../gifts/gift';
import {GiftSearchService} from '../providers/gift-search.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router } from "@angular/router";


@Component({
  selector: 'gift-search',
  templateUrl: './gift-search.component.html',
  styleUrls: ['./gift-search.component.css'],
  providers: [GiftSearchService]

})
export class GiftSearchComponent implements OnInit {
  gifts: Observable<Gift[]>;
  private searchTerms = new Subject<string>();

  constructor(
      private giftSearchService:GiftSearchService,
      private router:Router,
      private logger: Logger
    ) {}

    search(term: string): void {
        this.searchTerms.next(term);
    }

  ngOnInit(): void {
      this.gifts = this.searchTerms
        .debounceTime(300)  //wait 300ms after eachkeystroke before considering the searchTerms
        .distinctUntilChanged() //ingnore if next search term is same as previous
        .switchMap(term => term
            ? this.giftSearchService.search(term)
            :Observable.of<Gift[]>([])
        )
        .catch(error => {this.logger.log(error);
                return Observable.of<Gift[]>([]);
    });


  }

  gotoDetail(gift: Gift): void {
      let link= ['/detail', gift.id];
      this.router.navigate(link);
  }

}
