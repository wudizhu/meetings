import { User } from './../users/user';
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
  userApi: string;

  constructor(private angularfire: AngularFireDatabase, private logger: Logger) {
  }

  getUser(uid: string): FirebaseListObservable<User[]> {
    this.userApi =  '/users';
    this.logger.log("the firebase api is : " + this.userApi);
    return this.angularfire.list(this.userApi
      , { query: {
      orderByChild: 'uid',
      equalTo: uid
     }
    }
    )
  }

  getAllMeetings(person: string): FirebaseListObservable<any[]> {
    this.api = '/' + person + '/meetings';
    this.logger.log("the firebase api is : " + this.api);
    return this.angularfire.list(this.api);

  }


    getMeeting(person: string, recieved: boolean): FirebaseListObservable<any[]> {
    this.api = '/' + person + '/meetings';
    this.logger.log("the firebase api is : " + this.api);
    return this.angularfire.list(this.api, { query: {
      orderByChild: 'recieved',
      equalTo: recieved
     }
    })
  }

  addMeeting(newmeeting:any): void {
    this.logger.log("the firebase api is : " + this.api);
     this.angularfire.list(this.api).push(newmeeting);

  }

  updateMeeting(key:string, updatemeeting:any): void {
    this.logger.log("the firebase api is : " + this.api);
    console.log ("updating meeting with key: " + key);
     this.angularfire.list(this.api).update(key, updatemeeting);

  }

  // removeMeeting(meeting:Meeting): void {
  //   this.logger.log("the firebase api is : " + this.api);
  //   this.angularfire.list(this.api).remove(meeting);

  // }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

