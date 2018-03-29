import { Injectable, Inject } from '@angular/core';
import { GameState, Adventure, Option } from './interfaces';

import { AdventureToken } from './tokens'

const SAVEKEY = 'GAMEITEM';

@Injectable()
export class StateHandler {
  private listeners = [];
  private state: GameState;
  private get scene() {
    return this.adventure.scenes[this.state.atScene];
  }
  constructor(@Inject(AdventureToken) private adventure: Adventure){
    let saveStr = localStorage.getItem(SAVEKEY);
    if (saveStr) {
      this.state = JSON.parse(localStorage.getItem(SAVEKEY));
    } else {
      this.reset();
    }
  }
  private reset(){
    this.state = {...this.adventure.startState};
  }
  private save() {
    localStorage.setItem( SAVEKEY, JSON.stringify(this.state) );
  }
  private notifyListeners(){
    this.listeners.forEach( cb=> cb(this.scene) );
  }
  // Public API
  subscribeToScene(callback) {
    this.listeners.push(callback);
    callback(this.scene);
  }
  executeOption(opt:Option){
    this.state = {...this.state, atScene: opt.to};
    this.save();
    this.notifyListeners();
  }
  resetAdventure(){
    this.reset();
    this.save();
    this.notifyListeners();
  }
}
