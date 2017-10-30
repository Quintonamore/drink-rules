import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Game component that lists all of a users games that they have created.
 */
@Component({
  selector: 'game-component',
  templateUrl: './game.component.html'
})
export class GameComponent {

  games: any;

  constructor(db: AngularFirestore){
    db.collection('users').valueChanges().subscribe(data => this.games = data);
  }
}
