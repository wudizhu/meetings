import { AuthService } from "app/providers/auth.service";
import { Logger } from "app/providers/logger.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, Validators, NgForm, FormsModule } from "@angular/forms";

// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const EMAIL_REGEX_ALTERNATIVE = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$";

@Component({
  selector: "app-login-email",
  templateUrl: "./email.component.html",
  styleUrls: ["./email.component.css"]
})
export class EmailComponent implements OnInit {
  state: string = "";
  error: any;
  welcome: string;
  email: string = "";
  password: string = "";
  goBack: string = "";

  // formControl = new FormControl('', Validators.required);
  // emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);

  constructor(
    private auth: AuthService,
    private router: Router,
    private logger: Logger
  ) {}

  home() {
    this.logger.log("going to home page.");
    this.router.navigate(["/lifemeetings"]);
  }

  // // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.email + "||" + this.password);
  }

  /*Login if the credentials are valid*/
  onLogingSubmit(formData) {
    this.logger.log(formData);
    this.logger.log(formData.value.email, formData.value.password);
    if (formData.valid) {
      //Only login if the user is not authenticated
      //if the user is authenticated, then she must first logout
      if (!this.auth.isAuthenticated) {
        this.logger.log("connecting to the server...");
        this.auth
          .signInWithEmailAndPassword(
            formData.value.email,
            formData.value.password
          )
          .then(
            data => {
              this.logger.log("Promise resolve recieved", data);
              this.router.navigate(["/lifemeetings"]);
            },
            err => {
              this.logger.log("Promise reject recieved", err);
              //   this.logger.log("Login failed! Let's show some feedback!");
              this.error = err.message;
            }
          );
      } else {
        this.logger.log(
          "Only login if the user is not authenticated, if the user is authenticated, then she must first logout"
        );
        this.router.navigateByUrl("/lifemeetings");
      }
    }
  }

  public ngOnInit(): void {
    this.welcome = "Login as Administrator";
    this.goBack = "Or continue as guest";
  }
}
