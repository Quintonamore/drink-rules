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

  public userDocString: string = 'eRdXuU2swHSyyM8B64zD';

  constructor(private userDataService: GetUserDataService) {
    this.getUserInfo();
  }


  public getUserInfo() {
    this.userDataService.getUserInfo(this.userDocString).subscribe(data => {
      // Assign the data to userInfo and then call the GameInfo function since the user info is finished loading
      this.userInfo = data;
      this.getGameInfo();
    });
  }

  public getGameInfo() {
    // Temporary array and temp GetUserDataService for whatever reason (JS Closure?)
    let tmp_service = this.userDataService;
    let tmp_array = [];

    // Send a request for each game document the user has.
    this.userInfo.games.forEach(function(value){
      tmp_service.getGameData(value.id).subscribe(data => {
        tmp_array.push(data);
        console.log(data);
      });
    });

    this.gameDocs = tmp_array;
  }
}
