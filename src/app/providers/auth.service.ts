
import { FirebaseListObservable } from "angularfire2/database";
import { meetingFirebaseService } from "app/providers/meeting.firebaseService";
import { User } from "./../users/user";
import { CanActivate, Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase/app';
import { Logger } from "app/providers/logger.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return Observable.from(this.auth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        if (!authenticated) this.router.navigate(["/login"]);
      });
  }
}

@Injectable()
export class AuthService implements OnDestroy {
  private authState: firebase.User;
  private user: User;
  private users: User[];
  private alive: boolean;

  constructor(
    private angularFireAuth: AngularFireAuth,
    public logger: Logger,
    private router: Router,
    public meetingsService: meetingFirebaseService
  ) {
    this.init();
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  private init(): void {
    this.alive = true;
    this.angularFireAuth.authState.subscribe(authState => {
      if (authState !== null) {
        this.authState = authState;
        this.meetingsService
          .getUser(this.authState.uid)
          .map(items => {
            this.logger.log("raw users object is: " + JSON.stringify(items));
            return items.map(item => {
              this.logger.log("the user is: " + JSON.stringify(item));
              return item;
            });
          }).takeWhile(()=> this.alive).subscribe(users => {
            this.user = users[0];
            this.logger.log(
              "the displayed user is: " + JSON.stringify(this.user)
            );
          });
      }
    });
  }

  public get currentUid(): string {
    return this.authState ? this.authState.uid : undefined;
  }

  public get currentUser(): User {
    if (this.authState) {
      return this.user;
    } else {
      return undefined;
    }
  }

  public get currentUserObservable(): Observable<firebase.User> {
    return this.angularFireAuth.authState;
  }

  public get currentAuth(): firebase.auth.Auth {
    return this.angularFireAuth.auth;
  }

  public get isAnonymous(): boolean {
    return this.authState ? this.authState.isAnonymous : false;
  }

  public get isAuthenticated(): boolean {
    return !!this.authState;
  }

  public logout(): void {
    this.angularFireAuth.auth
      .signOut()
      // You only want unathenticated states:
      .then(() => {
        this.authState = null;
        this.router.navigate(["/login"]);
      });
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    //Only login if the user is not authenticated
    //if the user is authenticated, then she must first logout
    let signIn: Promise<any> = new Promise((resolve, reject) =>
      this.angularFireAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(
          data => {
            this.logger.log(data);
            resolve(data);
          },
          err => {
            this.logger.log(err);
            reject(err);
          }
        )
    );
    return signIn;
  }
}
