import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class GetUserDataService {

    public fireDB: AngularFirestore;

    constructor(db: AngularFirestore){
        // Assign the db from the constructor so that it can be used in ngOnInit
        this.fireDB = db;
    }

    /**
     * Get the User info & game reference list
     * @param userString 
     */
    public getUserInfo(userString: string) {
        return this.fireDB.collection('users').doc(userString).valueChanges();
    }

    /**
     * Get the Game data for the referenced game from the user game list
     * @param gameID 
     */
    public getGameData(gameID: string) {
        return this.fireDB.collection('games').doc(gameID).valueChanges();
    }
}