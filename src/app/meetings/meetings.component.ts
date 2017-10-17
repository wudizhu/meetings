import { AuthService } from './../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { SearchMeetingPipe } from './../pipes/search.pipe';
import {
  FirebaseListObservable
} from "angularfire2/database";
import { Component, Pipe } from "@angular/core";
import { OnInit } from "@angular/core";
import { Meeting } from "./meeting";
import { meetingFirebaseService } from "../providers/meeting.firebaseService";
import { Router, ActivatedRoute, Params } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Logger } from "app/providers/logger.service";



@Component({
  selector: 'meetings',
  templateUrl: "./meetings.component.html",
  styleUrls: ["./meetings.component.css"],
})

export class meetingsComponent implements OnInit {
  status: boolean = true;
  meetings: Meeting[];
  meetingsObservable: FirebaseListObservable<Meeting[]>;
  // meetingsList: Observable<Meeting[]>;

  user: string;
  authenticationTest: string;
  searchText: string = "";
  // Declare local variable

  sortingProperty: string = "time";
  isDesc: boolean = true;
  direction: number = this.isDesc ? -1 : 1;
  sortingOrder: string = "Newest First";

  // Change sort function to this:
  sort(){
      this.isDesc = !this.isDesc; //change the direction
      this.direction = this.isDesc ? -1 : 1;
      this.sortingOrder = this.isDesc? "Newest First" : "Oldest First"
 }

  searchMeeting(keyword) {
    console.log("search is clicked with :" + keyword );
    this.searchText = keyword;
  }

  shouldDisplayPic(url:string): boolean {
    return (url !== "assets/images/placeholder.png");
  }


  shouldDisplayStatus(status:string): boolean {
    return (status !== "Finished");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logger.log("loading meetings!");
    if (this.auth.isAuthenticated) {
      this.authenticationTest = this.auth.currentUid;
    } else {
      this.authenticationTest = "Something wrong with Auth";
    }


    this.route.params
      .switchMap((params: Params) => this.getAllmeetings('Hongyan', 'firebase'))
      .subscribe(meetings => {
        this.logger.log("meetingsdata are " + JSON.stringify(meetings));
        this.meetings = meetings
          .filter(item => {
            if (item.status === null || item.status === undefined) {
              return false;
            } else {
              this.logger.log("status :" + item.status, !!item.status);
              return (!!item.status === this.status) ? true : false;
            }
          });
      });

  }


  constructor(
    // private router: Router,
    private meetingFirebaseService: meetingFirebaseService,
    private route: ActivatedRoute,
    private logger: Logger,
    private auth : AuthService
  ) { }


  getAllmeetings(person, service): FirebaseListObservable<Meeting[]> {
    this.logger.log("The current user is :" + person);
    this.user = person; //set the user for future calls within the same route
    if (service != null) {
      if (service == "firebase") {
        this.meetingsObservable = <FirebaseListObservable<
          Meeting[]
          >>this.meetingFirebaseService.getAllMeetings(person).map(items => {
            this.logger.log("raw object is: " + JSON.stringify(items));
            return items.map(item => {
              this.logger.log("the meeting key is: " + item.$key);
              let {
                time: time,
                description: description,
                speaker: speaker,
                pictureURL: speakerPictureURL,
                speakerlink: speakerlink,
                status: status
            } = item;
              let meeting = new Meeting(
                item.$key,
                time,
                description,
                speaker,
                speakerPictureURL,
                speakerlink,
                status
              );
              return meeting;
            });
          });

        return this.meetingsObservable;
      }
    }
  }

   errorHandler(event) {
    this.logger.log(event);
  }
}
