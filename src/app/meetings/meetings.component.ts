import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { SearchFilter } from "./../pipes/search.pipe";
import {
  FirebaseListObservable
} from "angularfire2/database";
import { Component, Pipe } from "@angular/core";
import { OnInit } from "@angular/core";
import { Meeting } from "./meeting";
import { meetingFirebaseService } from "../providers/meeting.firebaseService";
import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { Logger } from "app/providers/logger.service";



@Component({
  selector: "meetings",
  templateUrl: "./meetings.component.html",
  styleUrls: ["./meetings.component.css"]
})
export class meetingsComponent implements OnInit {
  status: boolean = true;
  meetings: Meeting[];
  meetingsObservable: FirebaseListObservable<Meeting[]>;
  // meetingsList: Observable<Meeting[]>;

  searchingMeetings: boolean;
  newMeeting: Meeting;
  user: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logger.log("loading meetings!");
    this.newMeeting = new Meeting();



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
                PictureURL: speakerPictureURL,
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
