import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Rules component that lists the rules and allows users to add new rules to their existing games.
 */
@Component({
    selector: 'rules-component',
    templateUrl: './rules.component.html'
})
export class RulesComponent {

    @Input()
    public gameObj: any = "";

    @Output()
    public onCloseRules = new EventEmitter<any>();

    constructor() {}

    /**
     * Emit an empty event to close the rules page
     */
    public closeRulesPage() {
        this.onCloseRules.emit();
    }
}