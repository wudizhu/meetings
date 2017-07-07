import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Gift } from '../gifts/gift';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class GiftFirebaseService {
  constructor(private angularfire: AngularFireDatabase) { }

  getGiftes(person): FirebaseObjectObservable<any> {
    var api = '/gifts/' + person + '/desired-gifts';
    console.log(api);
    return this.angularfire.object(api);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

