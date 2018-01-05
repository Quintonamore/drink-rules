import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewDataService } from '../common/services/newData.service';

/**
 * Rules component that lists the rules and allows users to add new rules to their existing games.
 */
@Component({
    selector: 'rules-component',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css']
})
export class RulesComponent {

    @Input()
    public gameObj: any = "";

    @Input()
    public gid: string;

    @Output()
    public onCloseRules = new EventEmitter<any>();

    @Output()
    public deleteGameId = new EventEmitter<any>();

    public gameMode: boolean = false;

    public drinks: number;

    constructor(private newDataService: NewDataService ) {}

    /**
     * Emit an empty event to close the rules page
     */
    public closeRulesPage() {
        this.onCloseRules.emit();
        this.drinks = 0;
    }

    /**
     * Given a rule this will update the Firestore DB with the new rule.
     * @param rule 
     */
    public addRule(rule: string) {
        this.newDataService.addRuleToGame(this.gid, rule, this.gameObj);
    }

    /**
     * Sets the game mode to true to enter the game mode which starts to count drinks.
     */
    public toggleDrinkingGame() {
        this.gameMode = !this.gameMode;
        this.drinks = 0;
    }

    /**
     * Emits an event to the app component that a game has been deleted.
     */
    public deleteGame() {
        this.deleteGameId.emit();
    }
}