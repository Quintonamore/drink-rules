import { Component, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Game { quinton_teas: {first_name: string, game_rules: Array<string>}};

/**
 * Game component that lists all of a users games that they have created.
 */
@Component({
  selector: 'game-component',
  templateUrl: './game.component.html'
})
export class GameComponent {

  private games: AngularFirestoreCollection<Game>;

  private game: Observable<Game[]>;

  public displayGames: any;

  @Input() username: string;

  constructor(db: AngularFirestore){
    this.games = db.collection<Game>('users');
    this.game = this.games.valueChanges();
    this.game.subscribe(data => {
      console.log(data);
      this.displayGames = data[0].quinton_teas.first_name;
    });
  }
}
