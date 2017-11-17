import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class NewDataService {

    constructor(private fireDB: AngularFirestore) { }

    /**
     * Takes a uid and gamename, and then adds a blank game with no rules.
     * When the game is made, this calls gameMade to then create a reference to the game in the user's games array.
     * @param uid 
     */
    public addGameToUser(uid: string, gameName: string, userData: any) {

        let gameCollection = this.fireDB.collection('games');
        gameCollection.add({name: gameName, rules: []}).then(ref => this.gameMade(uid, ref, userData));
    }

    /**
     * Add the newly created game to the user's game array.
     * @param uid 
     * @param ref 
     * @param userData 
     */
    private gameMade(uid: string, ref: any, userData: any) {
        // Add the doc ref to the user games array    
        userData.games.push(ref);

        // Set the DB user document to the updated document
        this.fireDB.collection('users').doc(uid).set(userData);
    }

    /**
     * Add a new rule to the referenced game.
     * @param gid 
     * @param rule 
     * @param gameData 
     */
    public addRuleToGame(gid: string, rule: string, gameData: any) {
        // Set up the new rule to the game array
        gameData.rules.push(rule);

        // Set the DB game document to the updated document
        this.fireDB.collection('games').doc(gid).set(gameData);

    }

}