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

  constructor(public angularfire: AngularFireAuth, private router: Router) {

    this.angularfire.authState.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

  }

  logout() {
     this.angularfire.auth.signOut();
     console.log('logged out');
     this.router.navigate(['/login']);
  }

  manageGifts(person) {
    console.log(person);
    this.router.navigate(['/gifts', person]);
  }


  viewGifts(person) {
    console.log(person);
    this.router.navigate(['/gifts', person]);
  }


  ngOnInit() {
  }

}
