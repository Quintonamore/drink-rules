import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { GetUserDataService } from './common/services/getUserData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public title:string = 'app';

  public page: number = 1;

  public userInfo: any = "";

  public gameDocs: Array<any> = [];

  public rules: any = "";

  public userDocString: string = 'eRdXuU2swHSyyM8B64zD';

  constructor(private userDataService: GetUserDataService) {
    this.getUserInfo();
  }

  /**
   * Get userinfo which is ran at the start of the app to get the user info document
   */
  public getUserInfo() {
    this.userDataService.getUserInfo(this.userDocString).subscribe(data => {
      // Assign the data to userInfo and then call the GameInfo function since the user info is finished loading
      this.userInfo = data;
      this.getGameInfo();
    });
  }

  /**
   * Called when the getUserInfo method is done, this is called to get all of a user's game rules for every game
   * 
   * Sometime in the future it may not be realistic to grab ALL of the data.
   */
  public getGameInfo() {
    // Temporary array and temp GetUserDataService for whatever reason (JS Closure?)
    let tmp_service = this.userDataService;
    let tmp_array = [];

    // Send a request for each game document the user has.
    this.userInfo.games.forEach(function(value){
      tmp_service.getGameData(value.id).subscribe(data => {
        tmp_array.push(data);
      });
    });

    this.gameDocs = tmp_array;
  }

  /**
   * Opens the certain ruleset for which game was selected by the user.
   * @param index 
   */
  public openRuleSet(index: number) {
    this.page = 0;
    this.rules = this.gameDocs[index];
  }
}
