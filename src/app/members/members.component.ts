import { Logger } from './../providers/logger.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})

export class MembersComponent implements OnInit {
  name: any;

  constructor(public angularfire: AngularFireAuth, private router: Router, private logger: Logger) {

    this.angularfire.authState.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

  }

  logout() {
     this.angularfire.auth.signOut();
     this.logger.log('logged out');
     this.router.navigate(['/login']);
  }

  manageGifts(person) {
    this.logger.log(person);
    this.router.navigate(['/gifts', person]);
  }


  viewGifts(person) {
    this.logger.log(person);
    this.router.navigate(['/gifts', person]);
  }

  log() {
    this.logger.log("the mouse over event is fired");
  }

  ngOnInit() {
  }

}
