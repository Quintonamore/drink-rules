import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {

    public userGoogleData: any;

    public uidSubject: Subject<string>;

    constructor(public auth: AngularFireAuth) {
        console.log("CREATING LOGIN SERVICE");
        this.uidSubject = new Subject();
    }

    /**
     * Login method, really just calls a new Google Auth Provider. And then determines whether its the user's first login
     */
    public login() {

        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(this.completeLogin(this.userGoogleData));
        this.uidSubject.next(this.userGoogleData);

    }

    public completeLogin(userData): any {
        this.userGoogleData = userData;
        this.uidSubject.next(userData);
    }

    /**
     * Calls the auth to sign out the user, & clears the userGoogleData
     */
    public logout() {
        this.userGoogleData = null;
        this.auth.auth.signOut();
    }
}