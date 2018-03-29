import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StateHandler } from './statehandler';
import { UI, Option } from './interfaces'

@Component({
  selector: 'scene',
  template: `
    <h4>{{currentUI.title}}</h4>
    <img [src]="currentUI.imgUrl">
    <p>{{currentUI.desc | plrname}}</p>
    <ul>
      <li (click)="selectOption(o)" *ngFor="let o of currentUI.opts">{{o.text}}</li>
      <li (click)="selectReset()" *ngIf="gameOver">Restart</li>
    </ul>
  `,
  styles: [
    'img {max-width: 250px; max-height: 200px;}',
    'li {cursor: pointer; user-select: none;}',
    'li:hover {background-color: aquamarine;}'
  ]
})
export class SceneComponent {
  currentUI: UI;
  get gameOver():boolean {
    return !this.currentUI.opts.length;
  }
  constructor(public stateHandler: StateHandler){
    stateHandler.subscribeToUI(ui => this.currentUI = ui);
  }
  selectOption(opt:Option){
    this.stateHandler.executeOption(opt);
  }
  selectReset(){
    this.stateHandler.resetAdventure();
  }
}
