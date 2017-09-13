import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdToolbarModule,
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { EmailComponent } from 'app/email/email.component';
import { Logger } from 'app/providers/logger.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';

import { AuthService } from './../providers/auth.service';

// import { AngularFireAuth } from 'angularfire2/auth';


// const authState: firebase.User = null;

const authState = {
  isAnonymous: false,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
} as firebase.User;

const AuthServiceMocks = {authState : Observable.of(authState)};

describe('EmailComponent', () => {

  let mockRouter:any;
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let debugElement: DebugElement;
  let loginButton: HTMLButtonElement;
  let element: HTMLElement;
  let authService: any;

  beforeEach(
    async(() => {
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [EmailComponent],
      providers: [{
        provide: AuthService,
        useValue: AuthServiceMocks
      }, {provide: Router,
         useValue: mockRouter}, Logger],
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
    })
    //.compileComponents() //not needed for webpack
})); //compile the template and css
 beforeEach (
   () => {
  fixture = TestBed.createComponent(EmailComponent);
  component = fixture.componentInstance;
  authService = fixture.debugElement.injector.get(AuthService);
  debugElement = fixture.debugElement.query(By.css('md-card-title'));
  element = debugElement.nativeElement;
  loginButton = fixture.debugElement.query(By.css('#LoginButton')).nativeElement;
 })

  //check the page before loading
  it("should display no title before component is loaded", ()=> {
        expect(element.textContent).toEqual('');
  });

  it("should display welcome title", ()=> {
        fixture.detectChanges();
        expect(element.textContent).toEqual(component.welcome);
  });

  //sanity check for mock service
  it('should define authentication service', ()=> {
    fixture.detectChanges();
    expect(authService).toBeDefined();
  })

  //Test the logic of submit function
  it('should disable the login if either user or password is invalid', ()=> {
    //arrange
    component.email = 'abc';
    component.password = 'abc';
    //act
    fixture.detectChanges();
    //assert
    expect(loginButton.disabled).toBeTruthy("Login disabled if inputs are invalid");
  })

  //Test the validation of the user and password


  //Test if the button is disabled when loginform is disabled.
  //Shoule we test this because it is the angular attribute directive
  //the part if the loginform is disabled then button is disabled is our own logic


});
