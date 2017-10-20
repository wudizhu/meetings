import { Subscription } from 'rxjs/Rx';
import { meetingFirebaseService } from 'app/providers/meeting.firebaseService';
import { AuthService } from "app/providers/auth.service";
import { Logger } from "app/providers/logger.service";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { User } from "app/users/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.onAuthSub.unsubscribe();
    this.initSub1.unsubscribe();
    this.initSub2.unsubscribe();
  }
  user: User = { name: "Guest", uid: "" };
  guest: User = { name: "Guest", uid: "" };
  loginState: string;
  private users: User[];
  onAuthSub; initSub1; initSub2 : Subscription;

  constructor(
    public authFire: AuthService,
    private router: Router,
    private logger: Logger,
    private mf: meetingFirebaseService
  ) {
   this.onAuthSub = this.authFire.getMessage().subscribe(uid => {
      this.logger.log("the displayed uid is: " + JSON.stringify(uid));
      this.mf
        .getUser(uid.toString())
        .map(items => {
          this.logger.log("raw users object is: " + JSON.stringify(items));
          return items.map(item => {
            this.logger.log("the user is: " + JSON.stringify(item));
            return item;
          });
        })
        // .takeWhile(() => this.alive) //another way to stop subscribe
        .subscribe(users => {
          if (users && users.length >= 1) {
            this.user = users[0];
            this.loginState = "Logout";
            this.logger.log(
              "the displayed user is: " + JSON.stringify(this.user)
            );
          }
        });
    });
  }

  logout() {
    this.logger.log("logged out");
    this.authFire.logout();
    this.router.navigate(["/login"]);
  }

  home() {
    this.logger.log("going to home page.");
    this.router.navigate(["/lifemeetings"]);
  }

  ngOnInit() {
    //set default value to avoid the template getting value before auth is ready
    this.loginState = "Login";
    this.initSub1 = this.authFire.currentUserObservable.subscribe(authState => {
      if (authState !== null) {
      this.initSub2 = this.mf
        .getUser(this.authFire.currentUid)
        .map(items => {
          this.logger.log("raw users object is: " + JSON.stringify(items));
          return items.map(item => {
            this.logger.log("the user is: " + JSON.stringify(item));
            return item;
          });
        })
        // .takeWhile(() => this.alive) //another way to stop subscribe
        .subscribe(users => {
          if (users && users.length >= 1) {
            this.user = users[0];
            this.loginState = "Logout";
            this.logger.log(
              "the displayed user is: " + JSON.stringify(this.user)
            );
          }
        });
      } else {
        this.user = this.guest;
        this.loginState = "Login";
      }
    });
  }
}
