import { Component, Inject } from '@angular/core';

import { Adventure, Option, UI } from './interfaces'
import { StateHandler } from './statehandler';

import { AdventureToken } from './tokens'

@Component({
  selector: 'app',
  template: `
    <div [class.dead]="gameOver">
      <nameform
        [currentName]="ui.name"
        (newName)="newName($event)"
      ></nameform>
      <hr>
      <h1>{{adventure.title}}</h1>
      <scene></scene>
    </div>
  `,
  styles: [
    '.dead {background-color: #F2C2CA}'
  ]
})
export class AppComponent {
  ui: UI
  get gameOver():boolean {
    return !this.ui.opts.length;
  }
  constructor(public stateHandler: StateHandler, @Inject(AdventureToken) public adventure: Adventure){
    stateHandler.subscribeToUI(ui => this.ui = ui);
  }
  newName(name:string){
    this.stateHandler.updateName(name);
  }
}
