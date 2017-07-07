import { Component, OnInit} from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name:any;
  title = 'Gifts';

  constructor(public angularfire: AngularFireAuth, private router: Router) {
    this.angularfire.authState.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

  }
  get diagnostic() { return JSON.stringify(this.name); }

  logout() {
     console.log('logged out');
     this.angularfire.auth.signOut();
     this.router.navigate(['/login']);
  }

  home() {
    console.log('going to home page.');
    this.router.navigate(['/members']);
  }

   ngOnInit() {
  }


}
