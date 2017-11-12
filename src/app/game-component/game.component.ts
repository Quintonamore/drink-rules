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

  public displayGames: any;

  // Angular Firestore db import
  private datab: AngularFirestore;

  @Input() documentStr: string;

  @Input() username: string;

  constructor(db: AngularFirestore){
    // Assign the db from the constructor so that it can be used in ngOnInit
    this.datab = db;
    // this.userCollectionReference = db.collection<Game>('users');
    // this.user = this.games.valueChanges();
    // this.user.subscribe(data => {
    //   console.log(data);
    //   this.displayGames = data[0].name;
    // });
  }

  ngOnInit() {
    console.log(this.documentStr);
    let tst = this.datab.collection('users').doc(this.documentStr);
    this.user = tst.valueChanges();
    this.user.subscribe(data => {
      console.log(data);
      this.displayGames = data;
    });
  }
}
