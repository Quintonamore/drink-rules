import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public title:string = 'app';

  public page: number = 1;

  public userDocString: string = 'eRdXuU2swHSyyM8B64zD';

  constructor(){
    
  }
}
