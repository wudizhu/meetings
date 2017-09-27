import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Logger } from './providers/logger.service';
import { GiftFirebaseService } from './providers/gift.firebaseService';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './providers/in-memory-data.service';
import { GiftHttpService } from './providers/gift.httpService';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, animate } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './providers/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { GiftSearchComponent } from './gift-search/gift-search.component';
import { GiftesComponent } from './gifts/gifts.component';
import { MdSliderModule, MdSlideToggleModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule, MaterialModule } from '@angular/material';
import { OverlayContainer } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";


describe('1st tests', () => {
  it('true is true', () => expect(true).toBe(true));
});

// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     const firebaseConfig = {
//       firebase: {
//         apiKey: "AIzaSyBZ6Z0j0q3ICT69URZYFpMhv2Q0FgM1DLg",
//         authDomain: "giftslist-bf2f8.firebaseapp.com",
//         databaseURL: "https://giftslist-bf2f8.firebaseio.com",
//         storageBucket: "giftslist-bf2f8.appspot.com",
//         messagingSenderId: "668847751266"
//       }
//     };
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent,
//         LoginComponent,
//         EmailComponent,
//         SignupComponent,
//         MembersComponent,
//         PageNotFoundComponent,
//         DashboardComponent,
//         GiftDetailComponent,
//         GiftSearchComponent,
//         GiftesComponent,
//         KeysPipe
//       ],
//       imports: [
//         BrowserModule,
//         BrowserAnimationsModule,
//         FormsModule,
//         ReactiveFormsModule,
//         HttpModule,
//         InMemoryWebApiModule.forRoot(InMemoryDataService),
//         AngularFireModule.initializeApp(firebaseConfig.firebase),
//         AppRoutingModule,
//         MdButtonModule,
//         MdCardModule,
//         MdMenuModule,
//         MdToolbarModule,
//         MdIconModule,
//         MdInputModule,
//         MdSliderModule,
//         MdSlideToggleModule,
//         FlexLayoutModule
//       ],
//       providers: [AuthGuard, GiftHttpService, InMemoryDataService, GiftFirebaseService, AngularFireAuth, AngularFireDatabase, Logger],
//     }).compileComponents();
//   }));
// });
