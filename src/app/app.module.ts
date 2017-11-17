import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { GameComponent } from './game-component';
import { RulesComponent } from './rules-component';
import { GetUserDataService } from './common/services/getUserData.service';
import { LoginService } from './common/services/logInService.service';
import { NewDataService } from './common/services/newData.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [ GetUserDataService, LoginService, NewDataService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
