import { meetingFirebaseService } from './providers/meeting.firebaseService';
import { AuthService } from 'app/providers/auth.service';
import { Logger } from 'app/providers/logger.service';
import { Component, OnInit} from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import {User} from 'app/users/user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name:any;
  title = 'Home';
  user: User = { name: 'Guest', uid: ""};
  guest: User = { name: 'Guest', uid: ""};
  loginState: string;

  constructor(public authFire: AuthService, private router: Router, private logger: Logger) {

  }

  get diagnostic() { return JSON.stringify(this.name); }

  logout() {
     this.logger.log('logged out');
     this.authFire.logout();
     this.router.navigate(['/login']);
  }

  home() {
    this.logger.log('going to home page.');
    this.router.navigate(['/lifemeetings']);
  }

   ngOnInit() {
     //set default value to avoid the template getting value before auth is ready
     this.loginState = 'Login';
     this.authFire.currentUserObservable.subscribe((authState) => {
      if (authState !== null && this.authFire.currentUser !== undefined) {
        this.user = this.authFire.currentUser;
        this.loginState = 'Logout';
        this.logger.log("authState is: ", authState, "User is: ", this.user);
      } else {
        this.user = this.guest;
        this.loginState = 'Login';
      }
    });
  }



}
