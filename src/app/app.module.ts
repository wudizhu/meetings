import { Logger } from './providers/logger.service';
import { GiftFirebaseService } from './providers/gift.firebaseService';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './providers/in-memory-data.service';
import { GiftHttpService } from './providers/gift.httpService';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, animate } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard, AuthService } from './providers/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { GiftSearchComponent } from './gift-search/gift-search.component';
import { GiftesComponent } from './gifts/gifts.component';
import {MdSliderModule, MdSlideToggleModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule} from '@angular/material';
import { OverlayContainer, MdTabsModule } from "@angular/material";
import {SearchFilter} from './pipes/search.pipe';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdDialogModule } from '@angular/material';
// import { ProceedDelete, ProceedDeleteDialog } from 'app/gifts/preceedDeleteDialog.component';



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
    LoginComponent,
    EmailComponent,
    SignupComponent,
    MembersComponent,
    PageNotFoundComponent,
    DashboardComponent,
    GiftDetailComponent,
    GiftSearchComponent,
    GiftesComponent,
    SearchFilter
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
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
    MdDialogModule
  ],
  // entryComponents: [
  //   ProceedDeleteDialog
  // ],
  providers: [AuthGuard, AuthService, GiftHttpService, InMemoryDataService, GiftFirebaseService, AngularFireAuth, AngularFireDatabase, Logger],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'dark-theme';
  }
}
