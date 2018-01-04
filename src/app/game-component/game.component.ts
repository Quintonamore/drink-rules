import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DrinkingGameObj } from '../common/objects/drinkingGameObj'; // Unused for now

/**
 * Game component that lists all of a users games that they have created.
 */
@Component({
  selector: 'game-component',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  @Input()
  public gameDocs: Array<any> = [];

  @Output()
  public onOpenRules = new EventEmitter<number>();

  constructor() {

  }

  /**
   * Emit the index which so the parent can open the corresponding rule-set.
   * @param index
   */
  public openGameRulesPage(index) {
    this.onOpenRules.emit(index);
  }
    
}
