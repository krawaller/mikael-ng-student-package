import { Injectable, Inject } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/withLatestFrom';

import { GameState, Adventure, Option, Action, ResetAction, Scene } from './interfaces';
import { AdventureToken } from './tokens'

const SAVEKEY = 'GAMEITEM';

function deriveStateFromAction(prevState: GameState, action: Action): GameState {
  switch(action.type){
    case 'link': 
      return {
        ...prevState,
        atScene: action.target
      };
    case 'newstate':
      return {...action.newState};
  }
}

@Injectable()
export class StateHandler {
  private action$ = new Subject<Action>();
  private state$ = this.action$.withLatestFrom(this.action$, deriveStateFromAction);
  private scene$ = BehaviorSubject.from(this.state$.map(s => this.adventure.scenes[s.atScene]));
  constructor(@Inject(AdventureToken) private adventure: Adventure){
    this.state$.do(s => localStorage.setItem( SAVEKEY, JSON.stringify(s) ));
    let saveStr = localStorage.getItem(SAVEKEY);
    if (saveStr) {
      this.action$.next({type: 'newstate', newState: JSON.parse(localStorage.getItem(SAVEKEY))});
    } else {
      this.resetAdventure();
    }
  }
  // Public API
  subscribeToScene(callback) {
    this.scene$.subscribe(callback);
  }
  executeOption(opt:Option){
    this.action$.next({type: 'link', target: opt.to});
  }
  resetAdventure(){
    this.action$.next({type: 'newstate', newState: this.adventure.startState});
  }
}
