import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { GetUserDataService } from './common/services/getUserData.service';
import { LoginService } from './common/services/logInService.service';
import { NewDataService } from './common/services/newData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public page: number = 0;

  public userInfo: any = '';

  public gameDocs: Array<any> = [];

  public gameSubs: Array<any> = [];

  public rules: any = '';

  public userGoogleData: any = '';

  public userDocString: string = '';

  public openGID: string = '';

  public openGameIndex: number;

  constructor(private userDataService: GetUserDataService,
    private loginService: LoginService, private newDataService: NewDataService ) {

    // Check to see if the user is already logged in.
    this.loginService.isUserLoggedIn();

    this.loginService.uidSubject.subscribe(data => this.finishLogIn(data));

  }

  /**
   * Get userinfo which is ran at the start of the app to get the user info document
   */
  public getUserInfo() {
    this.userDataService.getUserInfo(this.userDocString).subscribe(data => {
      // Assign the data to userInfo and then call the GameInfo function since the user info is finished loading
      this.userInfo = data;

      if ( this.userInfo ) {
        this.getGameInfo();
      } else {
        // The user doesn't exist yet, so make it!
        this.newDataService.newUser(this.userDocString);
      }
    });
  }

  /**
   * Called when the getUserInfo method is done, this is called to get all of a user's game rules for every game
   * 
   * Sometime in the future it may not be realistic to grab ALL of the data.
   */
  public getGameInfo() {

    // Send a request for each game document the user has.
    for(let i = 0; i < this.userInfo.games.length; i ++ ) {
      this.gameSubs[i] = this.userDataService.getGameData(this.userInfo.games[i].id).subscribe(data => {
        this.gameDocs[i] = data;
      });
    }
  }

  /**
   * Add a game to the user that's logged in to the Firestore DB.
   * Then redirect to that game rule page so they can start adding rules.
   * @param gameName 
   */
  public addGame(gameName: string) {
    this.newDataService.addGameToUser(this.userDocString, gameName, this.userInfo);
  }

  /**
   * Takes in the gid and passes the event to the newDataService to delete the game.
   * Also unsubscribes from the deleted game, and removed the index from the game docs as well.
   */
  public deleteGame() {
    this.gameSubs[this.openGameIndex].unsubscribe();
    this.gameDocs.splice(this.openGameIndex, 1);
    this.newDataService.deleteGame(this.openGID, this.userDocString, this.userInfo);
    this.closeRuleSet();
  }

  /**
   * Opens the certain ruleset for which game was selected by the user.
   * @param index 
   */
  public openRuleSet(index: number) {
    this.page = 2;
    this.rules = this.gameDocs[index];
    this.openGID = this.userInfo.games[index].id;
    this.openGameIndex = index;
  }

  /**
   * Closes the rule set and takes the user back to the game screen
   */
  public closeRuleSet() {
    this.page = 1;
    this.openGID = '';
    this.rules = '';
    this.openGameIndex = -1;
  }

  /**
   * Calls the loginService to sign the user in and return the userDocString
   */
  public login() {
    this.loginService.login();
  }

  /**
   * This is called when the user is logged in, it sets up the app to get the uid and then get the user games
   * @param data 
   */
  public finishLogIn(data) {

    // If the data isn't there do nothing
    if (data === null) {
      return;
    }
    this.userDocString = data.uid;
    this.getUserInfo();
    this.page = 1;
  }

  /**
   * Logs the user out
   */
  public logout() {
    this.loginService.logout();
    this.page = 0;
  }
}
