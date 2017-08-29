import { Observable } from 'rxjs/Rx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, animate } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmailComponent } from 'app/email/email.component';
import { MdSliderModule, MdSlideToggleModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule, MaterialModule } from '@angular/material';
import { OverlayContainer } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Router } from "@angular/router";
import { Logger } from 'app/providers/logger.service';
import * as firebase from 'firebase/app';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



const authState: firebase.User = null;
const AngularFireAuthMocks = {authState : Observable.of(authState)};
describe('EmailComponent', () => {

  let mockRouter:any;
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;
  let authService: any;

  beforeEach(
    async(() => {
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [EmailComponent],
      providers: [{
        provide: AngularFireAuth,
        useValue: AngularFireAuthMocks
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
  authService = fixture.debugElement.injector.get(AngularFireAuth);
  debugElement = fixture.debugElement.query(By.css('md-card-title'));
  element = debugElement.nativeElement;
 })

  it("should display no title before component is loaded", ()=> {
        expect(element.textContent).toEqual('');
  });

  it("should display welcome title", ()=> {
        fixture.detectChanges();
        expect(element.textContent).toEqual(component.welcome);
  });

  //mock the auth service
  it('should not authenticate before login', ()=> {
    fixture.detectChanges();
    expect(authService).toBeDefined();
  })


});
