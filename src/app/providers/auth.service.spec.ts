import 'rxjs/add/observable/of';

import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from 'app/app.module';
import { Logger } from 'app/providers/logger.service';
import * as firebase from 'firebase/app';

import { AuthService } from './auth.service';


const authState = {
  isAnonymous: false,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
} as firebase.User;

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(firebaseConfig.firebase)],
      providers: [
        AngularFireAuth,
        AuthService,
        Logger
      ]
    });
  });

  it('should be defined', inject([ AuthService ], (service: AuthService) => {
    expect(service).toBeDefined();
  }));

  it('.currentUser should be not anonymous', inject([ AuthService ], (service: AuthService) => {
    Reflect.set(service, 'authState', authState);

    expect(service.currentUser).toBe(authState);
  }));

  it('.currentUser should be undefined', inject([ AuthService ], (service: AuthService) => {
    expect(service.currentUser).toBe(undefined);
  }));

  /* Test async service comes later */
  // it('.currentUserObservable should be anonymous', inject([ AuthService ], (service: AuthService) => {
  //   Reflect.set(service, 'authState', authState);

  //   service.currentUserObservable.subscribe((value) => {
  //     expect(value).toBe(authState);
  //   });
  // }));

  // it('.currentUserObservable should be undefined', inject([ AuthService ], (service: AuthService) => {
  //   service.currentUserObservable.subscribe((value) => {
  //     expect(value).toBe(undefined);
  //   });
  // }));

  it('.currentUid should be of type String', inject([ AuthService ], (service: AuthService) => {
    Reflect.set(service, 'authState', authState);

    expect(service.currentUid).toBe(authState.uid);
  }));

  it('.currentUid should be undefined', inject([ AuthService ], (service: AuthService) => {
    expect(service.currentUid).toBe(undefined);
  }));

  it('.isAnonymous should be false', inject([ AuthService ], (service: AuthService) => {
    Reflect.set(service, 'authState', authState);

    expect(service.isAnonymous).toBe(false);
  }));
});
