import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Gift } from '../gifts/gift';
import 'rxjs/add/operator/toPromise';



    @Injectable()
    export class GiftFirebaseService {

      constructor(private angularfire : AngularFireDatabase) { }

      getGiftes(): FirebaseListObservable<any> {
          return this.angularfire.list('/gifts/Feng');
        }

      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
    }

    //   getGiftesSlowly(): Promise<Gift[]> {
    //     return new Promise(resolve => {
    //       // Simulate server latency with 2 second delay
    //       setTimeout(() => resolve(this.getGiftes()), 2000);
    //     });
    //   }

    //   getGift(id:number): Promise<Gift> {
    //     const url = `${this.giftsUrl}/${id}`;
    //     return this.http.get(url)
    //              .toPromise()
    //              .then(response => response.json().data as Gift)
    //              .catch(this.handleError);
    //   }

    //   update(gift: Gift): Promise<Gift> {
    //     const url = `${this.giftsUrl}/${gift.id}`;
    //     return this.http
    //       .put(url, JSON.stringify(gift), {headers: this.headers})
    //       .toPromise()
    //       .then(() => gift)
    //       .catch(this.handleError);
    //   }

    //   create(name: String): Promise<Gift> {
    //     return this.http
    //       .post(this.giftsUrl, JSON.stringify({name: name}), {headers: this.headers})
    //       .toPromise()
    //       .then(response => response.json().data)
    //       .catch(this.handleError);
    //     }

    //   delete(id: number): Promise<void> {
    //     const url = `${this.giftsUrl}/${id}`;
    //     return this.http.delete(url, {headers: this.headers})
    //       .toPromise()
    //       .then(() => null)
    //       .catch(this.handleError);

    //   }
    // }

