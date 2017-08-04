import { Logger } from 'app/providers/logger.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})


export class SignupComponent {
  state: string = '';
  error: any;
  email: string;
  password: string;

  constructor(public angularFire: AngularFireAuth, private router: Router, private logger: Logger) {

  }

  onSubmit(formData) {
    if(formData.valid) {
      this.logger.log(formData.value);
      this.angularFire.auth.createUserWithEmailAndPassword(
        formData.value.email,
        formData.value.password
      ).then(
        (success) => {
        this.logger.log(success);
        this.router.navigate(['/login'])
      }).catch(
        (err) => {
        this.logger.log(err);
        this.error = err;
      })
    }
  }
}
