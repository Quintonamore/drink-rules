import { Component, Input } from '@angular/core';
import { DrinkingGameObj } from '../common/objects/drinkingGameObj'; // Unused for now

/**
 * Game component that lists all of a users games that they have created.
 */
@Component({
  selector: 'game-component',
  templateUrl: './game.component.html'
})
export class GameComponent {

  @Input()
  public gameDocs: Array<any> = [];

  constructor(){

  }

  /**
   * Method that opens
   * @param game 
   */
  public openGameRulesPage(game){

  }
    
}
