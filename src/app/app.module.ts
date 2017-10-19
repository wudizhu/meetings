import { OrderrByPipe } from './pipes/orderBy.pipe';
import { meetingsComponent } from './meetings/meetings.component';
import { Logger } from './providers/logger.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, animate } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { AppComponent } from './app.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard, AuthService } from './providers/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MdChipsModule, MdSliderModule, MdSlideToggleModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule} from '@angular/material';
import { OverlayContainer, MdTabsModule } from "@angular/material";
import { SearchMeetingPipe } from './pipes/search.pipe';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdDialogModule } from '@angular/material';
import { meetingFirebaseService } from "app/providers/meeting.firebaseService";





export const firebaseConfig = {
    firebase: {
      apiKey: "AIzaSyBgNxQTpJRuPBbvQkfmMDTuI6NdbjLZYAw",
      authDomain: "hongyan-zhang.firebaseapp.com",
      databaseURL: "https://hongyan-zhang.firebaseio.com",
      projectId: "hongyan-zhang",
      storageBucket: "hongyan-zhang.appspot.com",
      messagingSenderId: "1099295376168"
    }
}



@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    SignupComponent,
    PageNotFoundComponent,
    meetingsComponent,
    SearchMeetingPipe,
    OrderrByPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AppRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdTabsModule,
    FlexLayoutModule,
    MdDialogModule,
    MdChipsModule
  ],
  providers: [AuthGuard, AuthService, AngularFireAuth, AngularFireDatabase, Logger, meetingFirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(overlayContainer: OverlayContainer) {
    // overlayContainer.themeClass = 'dark-theme';
  }
}
