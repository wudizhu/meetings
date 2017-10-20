import { meetingFirebaseService } from "app/providers/meeting.firebaseService";
import { AuthService } from "./../providers/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Rx";
import { Subject } from "rxjs/Subject";
import { SearchMeetingPipe } from "./../pipes/search.pipe";
import { FirebaseListObservable } from "angularfire2/database";
import { Component, Pipe } from "@angular/core";
import { OnInit } from "@angular/core";
import { Meeting } from "./meeting";
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

  user: string;
  authenticationStatus: string;
  addingMeeting; EditingMeeting: boolean;
  searchText: string = "";
  newMeeting; beforeEditMeeting: Meeting;
  // Declare local variable
  displayComingSoon: boolean = false;

  sortingProperty: string = "time";
  isDesc: boolean = true;
  direction: number = this.isDesc ? -1 : 1;
  sortingOrder: string = "Newest First";

  // Change sort function to this:
  sort() {
    this.isDesc = !this.isDesc; //change the direction
    this.direction = this.isDesc ? -1 : 1;
    this.sortingOrder = this.isDesc ? "Newest First" : "Oldest First";
  }

  searchMeeting(keyword) {
    console.log("search is clicked with :" + keyword);
    this.searchText = keyword;
  }

  shouldDisplayPic(url: string): boolean {
    return url !== "assets/images/placeholder.png";
  }

  addMeeting(meeting: Meeting) {
    this.logger.log("Meeting added with the data: " + JSON.stringify(meeting));
    this.meetingFirebaseService.addMeeting({
      time: meeting.time,
      description: meeting.description,
      speaker: meeting.speaker,
      pictureURL: meeting.speakerPictureURL,
      speakerlink: meeting.speakerlink,
      status: meeting.status
    });
    this.addingMeeting = false;
    this.newMeeting = new Meeting();
  }

  cancelAddMeeTing() {
    this.addingMeeting = false;
  }

  cancelEditMeeTing(meeting:Meeting) : void {
    this.logger.log("Cancel editting meeting: " + JSON.stringify(meeting));
    meeting.time = this.beforeEditMeeting.time;
    meeting.description = this.beforeEditMeeting.description;
    meeting.speaker = this.beforeEditMeeting.speaker;
    this.logger.log("Restore meeting with the data: " + JSON.stringify(meeting));
    this.EditingMeeting = false;
  }

  beginEditMeeTing(meeting: Meeting) {
    this.logger.log("Current editting meeting: " + JSON.stringify(meeting));
    this.EditingMeeting = true;
    this.beforeEditMeeting = new Meeting(
        meeting.key,
        meeting.time,
        meeting.description,
        meeting.speaker,
        meeting.speakerPictureURL,
        meeting.speakerlink,
        meeting.status
    )
    this.logger.log("Edit meeting with the data: " + JSON.stringify(this.beforeEditMeeting));

  }

  displayAddMeeting() {
    //prepare for adding a new meeting
    this.addingMeeting = true;
    this.newMeeting = new Meeting();
  }

  updateMeeting(meeting: Meeting) {
    this.logger.log(
      "Updating meeting  with the data: " + JSON.stringify(meeting)
    );
    this.meetingFirebaseService.updateMeeting(meeting.key, {
      time: meeting.time,
      description: meeting.description,
      speaker: meeting.speaker,
      pictureURL: meeting.speakerPictureURL,
      speakerlink: meeting.speakerlink,
      status: meeting.status
    });
    this.EditingMeeting = false;
  }

  removeMeeting(meeting: Meeting) {
    this.logger.log("Deleting meeting with the data: " + JSON.stringify(meeting));
    this.meetingFirebaseService.removeMeeting(meeting);
  }

  shouldDisplayStatus(status: string): boolean {
    return status !== "Finished";
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addingMeeting = false;
    this.EditingMeeting = false;
    this.logger.log("loading meetings!");
    if (this.auth.isAuthenticated) {
      this.authenticationStatus = this.auth.currentUid;
    } else {
      this.authenticationStatus = "Something wrong with Auth";
    }

    this.route.params
      .switchMap((params: Params) => this.getAllmeetings("Hongyan", "firebase"))
      .subscribe(meetings => {
        this.logger.log("meetingsdata are " + JSON.stringify(meetings));
        this.meetings = meetings.filter(item => {
          if (item.status === null || item.status === undefined) {
            return false;
          } else {
            this.logger.log("status :" + item.status, !!item.status);
            return !!item.status === this.status ? true : false;
          }
        });
      });
  }

  constructor(
    // private router: Router,
    private meetingFirebaseService: meetingFirebaseService,
    private route: ActivatedRoute,
    private logger: Logger,
    public auth: AuthService,
  ) {}

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

