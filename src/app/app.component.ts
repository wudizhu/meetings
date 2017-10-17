import { AuthService } from 'app/providers/auth.service';
import { Logger } from 'app/providers/logger.service';
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
  title = 'Home';

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
  }


}
