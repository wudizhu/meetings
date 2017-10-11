import { Subject } from 'rxjs/Subject';
import { Logger } from './logger.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Meeting } from "app/meetings/meeting";



@Injectable()
export class meetingFirebaseService {
  user: string;
  api: string;

  constructor(private angularfire: AngularFireDatabase, private logger: Logger) {
  }

  getAllMeetings(person: string): FirebaseListObservable<any[]> {
    this.api = '/' + person + '/meetings';
    this.logger.log("the firebase object is : " + this.api);
    return this.angularfire.list(this.api);

  }


    getMeeting(person: string, recieved: boolean): FirebaseListObservable<any[]> {
    this.api =  '/meeting/' + person + '/desired-meeting';
    this.logger.log("the firebase object is : " + this.api);
    return this.angularfire.list(this.api, { query: {
      orderByChild: 'recieved',
      equalTo: recieved
     }
    })
  }

  addmeeting(newmeeting:any): void {
    this.logger.log("the firebase object is : " + this.api);
     this.angularfire.list(this.api).push(newmeeting);

  }

    updatemeeting(key:string, updatemeeting:any): void {
    this.logger.log("the firebase object is : " + this.api);
    console.log ("updating meeting with key: " + key);
     this.angularfire.list(this.api).update(key, updatemeeting);

  }

   removemeeting(meeting:Meeting): void {
    this.logger.log("the firebase object is : " + this.api);
    console.log ("removing meeting with key: " + meeting.key);
     this.angularfire.list(this.api).remove(meeting.key);

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

