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

  public page: number = 0;

  users: Observable<any[]>;

  constructor(db: AngularFirestore){
    db.collection('users').valueChanges().subscribe(data => console.log(data));
  }
}
