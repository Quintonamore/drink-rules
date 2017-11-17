import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class NewDataService {

    constructor(private fireDB: AngularFirestore) { }

    /**
     * Takes a 
     * @param uid 
     */
    public addGameToUser(uid: string, gameName: string) {

        let gameCollection = this.fireDB.collection('games');
        gameCollection.add({name: gameName, rules: []});
    }

}