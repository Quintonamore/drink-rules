/**
 * Drinking game object that is used in the Firebase DB
 */
export class DrinkingGameObj {
    public name: string;
    // This is really an array of document references, can't find where those live.. yet!
    public games: Array<any>;
}