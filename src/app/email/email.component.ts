import { Component, OnInit } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent {
  state: string = '';
  error: any;
  welcome: string;
  email: string;
  password: string;

  constructor(public af: AngularFireAuth, private router: Router) {
      this.welcome = "Welcome to Gifts";
      this.af.authState.subscribe(auth => {
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      });
    }


  onSubmit(formData) {
    if(formData.valid) {
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
