import { Injectable, Inject } from '@angular/core';
import { GameState, Adventure, Option, Scene, UI } from './interfaces';

import { AdventureToken } from './tokens'

const SAVEKEY = 'GAMEITEM';

@Injectable()
export class StateHandler {
  private listeners = [];
  private state: GameState;
  private get scene() {
    return this.adventure.scenes[this.state.atScene];
  }
  private get ui(): UI {
    return {
      ...this.scene,
      name: this.state.name
    };
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
    this.listeners.forEach( cb=> cb(this.ui) );
  }
  // Public API
  subscribeToUI(callback: (UI) => any) {
    this.listeners.push(callback);
    callback(this.ui);
  }
  executeOption(opt:Option){
    this.state = {...this.state, atScene: opt.to};
    this.save();
    this.notifyListeners();
  }
  updateName(name: string){
    this.state = {...this.state, name};
    this.save();
    this.notifyListeners();
  }
  resetAdventure(){
    this.reset();
    this.save();
    this.notifyListeners();
  }
}
