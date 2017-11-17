import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoginService {

    public userGoogleData: any;

    public uidSubject: Subject<any>;

    constructor(public auth: AngularFireAuth) {
        console.log("CREATING LOGIN SERVICE");
        this.uidSubject = new Subject();
    }

    /**
     * Login method, really just calls a new Google Auth Provider. And then determines whether its the user's first login
     */
    public login() {
        return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(data => this.isUserLoggedIn());
    }

    /**
     * Returns the uid so that the application can get the user's info.
     */
    public getUserString(): string {
        return this.auth.auth.currentUser.uid;
    }

    /**
     * Finds out if there's a current user yet
     */
    public isUserLoggedIn() {
        this.auth.authState.subscribe(data => this.uidSubject.next(data));
    }

    /**
     * Calls the auth to sign out the user, & clears the userGoogleData
     */
    public logout() {
        this.userGoogleData = null;
        this.auth.auth.signOut();
    }
}