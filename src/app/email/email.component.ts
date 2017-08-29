import { Logger } from 'app/providers/logger.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FormControl, Validators, NgForm, FormsModule } from '@angular/forms';

// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const EMAIL_REGEX_ALTERNATIVE = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";

@Component({
  selector: 'app-login-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent {
  state: string = '';
  error: any;
  welcome: string;
  email: string = "";
  password: string = "";
  feng: string;
  // formControl = new FormControl('', Validators.required);
  // emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);


  constructor(public af: AngularFireAuth, private router: Router, private logger: Logger) {
      this.welcome = "Welcome to Gifts";
      this.af.authState.subscribe(auth => {
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      });
    }

  onSubmit(form: NgForm) {
    this.logger.log(form.controls);
    this.logger.log(form.valid);
  }

  // // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.email + "||" + this.password); }

  /*Login if the credentials are valid*/
  onLogingSubmit(formData) {
    this.logger.log(formData);
    this.logger.log(formData.value.email,formData.value.password);
    if(formData.valid) {
      this.logger.log("connecting to the server...");
      this.af.auth.signInWithEmailAndPassword(
        formData.value.email,
        formData.value.password).then(
        (success) => {
        this.logger.log(success);
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.logger.log(err);
        this.error = err;
      })
    }
  }
}
