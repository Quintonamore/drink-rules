import { Component, Input } from '@angular/core';

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

    constructor() {}
}