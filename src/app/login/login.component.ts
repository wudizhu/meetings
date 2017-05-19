import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: any;
  welcome: string;
  constructor(public angularFire: AngularFireAuth, private router:Router) {
    this.welcome = "Welcome to Gifts";
    this.angularFire.authState.subscribe(
      auth => {
          if(auth) {
              this.router.navigateByUrl('/members');

          }

      })
  }


}



