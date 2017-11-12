import { Component, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

export interface Game { name: string, games: Array<any>};

/**
 * Game component that lists all of a users games that they have created.
 */
@Component({
  selector: 'game-component',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit{

  private games: AngularFirestoreDocument<{}>;

  private userCollectionReference: AngularFirestoreCollection<any>;

  private user: Observable<{}>;

  public userInfo: any;

  // Angular Firestore db import
  private datab: AngularFirestore;

  @Input() documentStr: string;

  @Input() username: string;

  constructor(db: AngularFirestore){
    // Assign the db from the constructor so that it can be used in ngOnInit
    this.datab = db;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  /**
   * Method to set up the Game Component by getting the DB information
   * 
   * TODO: Seperate this DB stuff into an Angular Service
   */
  public getUserInfo() {
    let tst = this.datab.collection('users').doc(this.documentStr);
    this.user = tst.valueChanges();
    this.user.subscribe(data => {
      console.log(data);
      this.userInfo = data;
      this.getGameNames(data);
    });
  }

  /**
   * Method to grab all of the list of games and game names from the Firebase DB
   */
  public getGameNames(data) {
    let gameDocIds: Array<string> = [];
    data.games.forEach(function(value){
      gameDocIds.push(value.id);
    });
  }
    
}
