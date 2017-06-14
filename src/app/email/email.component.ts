import { Hero } from './Hero';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormControl, Validators, NgForm, FormsModule } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent {
  state: string = '';
  error: any;
  welcome: string;
  email: string;
  password: string;
  feng: string;
  // formControl = new FormControl('', Validators.required);
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);


  constructor(public af: AngularFireAuth, private router: Router) {
      this.welcome = "Welcome to Gifts";
      this.af.authState.subscribe(auth => {
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      });
    }

  // powers = ['Really Smart', 'Super Flexible',
  //           'Super Hot', 'Weather Changer'];

  // model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  onSubmit(form: NgForm) {
    console.log(form.controls);
    console.log(form.valid);
  }

  // // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.email + "||" + this.password); }

  // newHero() {this.model = new Hero(42, "", "")}




  onLogingSubmit(formData) {
    if(formData.valid) {
      console.log("connecting to the server...");
      this.af.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }
}
