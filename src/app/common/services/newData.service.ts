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

    /**
     * Makes a new user entry for the new user. This should only be run once for every new user.
     * @param uid
     */
    public newUser(uid: string) {
        let usersCollection = this.fireDB.collection('users');
        usersCollection.doc(uid).set({games: []});
    }

    /**
     * Sends a request to firestore to remove the game document from the games collection
     * and the user's games array.
     * @param gid
     * @param uid
     * @param userData
     */
    public deleteGame(gid: string, uid: string, userData: any) {
        // Send the delete function with the game id to delete the game document
        this.fireDB.collection('games').doc(gid).delete();

        // Update the userData to remove the referenced game, and then update firestore
        for ( let i = 0; i < userData.games.length; i ++ ) {
            if ( userData.games[i].id === gid ) {
                userData.games.splice(i, 1);
                break;
            }
        }

        // Send the request with the updated userData
        this.fireDB.collection('users').doc(uid).set(userData);
    }

    /**
     * Sends a request to firestore to update the properties of a specific game.
     * @param gid 
     * @param gameData 
     */
    public updateGame(gid: string, gameData: any) {
        // Send the request to update the specified game with an updated gameData
        this.fireDB.collection('games').doc(gid).set(gameData);
    }

}