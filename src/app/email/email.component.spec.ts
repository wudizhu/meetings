import { DebugElement } from "@angular/core";
import {
  async,
  ComponentFixture,
  fakeAsync,
  tick,
  inject,
  TestBed
} from "@angular/core/testing";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdToolbarModule
} from "@angular/material";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { EmailComponent } from "app/email/email.component";
import { Logger } from "app/providers/logger.service";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Rx";

import { AuthService } from "./../providers/auth.service";

// import { AngularFireAuth } from 'angularfire2/auth';

// const authState: firebase.User = null;

const authState = {
  isAnonymous: false,
  uid: "17WvU2Vj58SnTz8v7EqyYYb0WRc2"
} as firebase.User;

const AuthServiceMocks = {
  authState: Observable.of(authState),
  signInWithEmailAndPassword: () => ({
    then: () => ({})
  })
};

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe("EmailComponent", () => {
  let routerStub: any;
  let component: EmailComponent;
  let formdata: any;
  let fixture: ComponentFixture<EmailComponent>;
  let loginButton: HTMLButtonElement;
  let title: HTMLElement;
  let userEmail: HTMLInputElement;
  let password: HTMLInputElement;
  let authService: any;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [EmailComponent],
        providers: [
          {
            provide: AuthService,
            useValue: AuthServiceMocks
          },
          {
            provide: Router,
            useClass: RouterStub
          },
          Logger
        ],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MdButtonModule,
          MdCardModule,
          MdMenuModule,
          MdToolbarModule,
          MdIconModule,
          MdInputModule,
          MdSliderModule,
          MdSlideToggleModule,
          FlexLayoutModule,
          BrowserAnimationsModule
        ] // declare the test component
      });
      //.compileComponents() //not needed for webpack
    })
  ); //compile the template and css
  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;

    title = fixture.debugElement.query(By.css("md-card-title")).nativeElement;
    loginButton = fixture.debugElement.query(By.css("#LoginButton"))
      .nativeElement;
    userEmail = fixture.debugElement.query(By.css("#userEmail")).nativeElement;
    password = fixture.debugElement.query(By.css("#password")).nativeElement;
  });

  //sanity check the page before loading
  it("should display no title before component is loaded", () => {
    expect(title.textContent).toEqual("");
  });

  it("should display welcome title", () => {
    fixture.detectChanges();
    expect(title.textContent).toEqual(component.welcome);
  });

  //sanity check for mock service
  it("should define authentication service", () => {
    //get authService stub
    authService = fixture.debugElement.injector.get(AuthService);
    fixture.detectChanges();
    expect(authService).toBeDefined();
  });

  //Test the logic of submit function
  it(
    "should disable the login if either user or password is invalid",
    async(() => {
      //arrange
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        userEmail.value = "abc";
        userEmail.dispatchEvent(new Event("input"));
        password.value = "1234";
        password.dispatchEvent(new Event("input"));

        //act
        fixture.detectChanges();

        //assert
        expect(loginButton.disabled).toBeTruthy(
          "Login disabled if inputs are invalid"
        );
      });
    })
  );

  //Test the validation of the user and password
  it(
    "should disabled the login if password is shorter than 6",
    async(() => {
      //arrange
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        userEmail.value = "test@test.com";
        userEmail.dispatchEvent(new Event("input"));
        password.value = "12345";
        password.dispatchEvent(new Event("input"));

        //act
        fixture.detectChanges();

        //assert
        expect(loginButton.disabled).toBeTruthy(
          "Password should be at least 6 characters long."
        );
      });
    })
  );

  //Test the validation of the user and password
  it(
    "should enabled the login if email and password are valid",
    async(() => {
      //arrange
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        userEmail.value = "test@test.com";
        userEmail.dispatchEvent(new Event("input"));
        password.value = "123456";
        password.dispatchEvent(new Event("input"));

        //act
        fixture.detectChanges();

        //assert
        expect(loginButton.disabled).toBeFalsy(
          "login enabled with valid email and password."
        );
      });
    })
  );

  //when login success, navigate to members
  //This test does not work due to the nested async functions.
  //It always passes.
  //Will pick it up later with more knowledge about spy and async.
  /*
    it('should call navigate when login succeeds',
      inject([Router], (router,Router) =>
        async(()=> {


      fixture.detectChanges();
         //get injected router stub
        // routerStub = fixture.debugElement.injector.get(Router);
        const spy = spyOn(router, 'navigateByUrl');


        fixture.whenStable().then(()=>{


          fixture.detectChanges();
          const navArgs = spy.calls.first().args[0];
          //get the args passed to router.navigateByUrl()
           expect(navArgs).toBe('/members');
        });
        formdata = {value: {email: 'test@test.com', password: '123456'}};
        component.onLogingSubmit(formdata);

      })
      */

  //when login success, navigate to members
  //This test does not work due to the nested async functions.
  //It always fails because the spy.calls after async functions returns undefined.

  // it('should call navigate when login succeeds fakeSync',
  //     fakeAsync(()=> {

  //   fixture.detectChanges();

  //     /* get injected router stub */
  //     routerStub = fixture.debugElement.injector.get(Router);
  //     const spy = spyOn(routerStub, 'navigateByUrl');

  //     //get authService stub
  //     authService = fixture.debugElement.injector.get(AuthService);
  //     const spyAuth = spyOn(authService, 'signInWithEmailAndPassword');

  //     formdata = {value: {email: 'test@test.com', password: '123456'}};

  //     component.onLogingSubmit(formdata);

  //     tick();

  //     fixture.detectChanges();

  //     /* get the args passed to router.navigateByUrl() */
  //     expect(spyAuth).toHaveBeenCalled();
  //     expect(spy).toHaveBeenCalledWith(['/members']);

  //   })
  // )
});
