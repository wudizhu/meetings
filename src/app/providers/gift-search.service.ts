import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Gift} from '../gifts/gift';

@Injectable()
export class GiftSearchService {
    constructor(private http: Http) {}

    search(term:string): Observable<Gift []> {
        return this.http
                .get(`app/gifts/?name=${term}`)
                .map(response => response.json().data as Gift[]);
    }
}
