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
import { AuthGuard } from './providers/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GiftDetailComponent } from './gift-detail/gift-detail.component';
import { GiftSearchComponent } from './gift-search/gift-search.component';
import { GiftesComponent } from './gifts/gifts.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule} from '@angular/material';



export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBZ6Z0j0q3ICT69URZYFpMhv2Q0FgM1DLg",
    authDomain: "giftslist-bf2f8.firebaseapp.com",
    databaseURL: "https://giftslist-bf2f8.firebaseio.com",
    storageBucket: "giftslist-bf2f8.appspot.com",
    messagingSenderId: "668847751266"
  }
};

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
    GiftesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule
  ],
  providers: [AuthGuard, GiftHttpService, InMemoryDataService, GiftFirebaseService, AngularFireAuth, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
