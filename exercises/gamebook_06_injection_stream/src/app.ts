import { Component, Inject } from '@angular/core';

import { Adventure, Scene } from './interfaces'
import { StateHandler } from './statehandler';

import { AdventureToken } from './tokens'

@Component({
  selector: 'app',
  template: `
    <div [class.dead]="gameOver">
      <h1>{{adventure.title}}</h1>
      <scene></scene>
    </div>
  `,
  styles: [
    '.dead {background-color: #F2C2CA}'
  ]
})
export class AppComponent {
  gameOver: boolean;
  // putting "public" before a parameter automatically stores it on `this`
  constructor(public stateHandler: StateHandler, @Inject(AdventureToken) public adventure: Adventure){
    stateHandler.subscribeToScene((scene:Scene) => this.gameOver = !scene.opts.length);
  }
}
