import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StateHandler } from './statehandler';
import { Scene, Option } from './interfaces'

@Component({
  selector: 'scene',
  template: `
    <h4>{{currentScene.title}}</h4>
    <img [src]="currentScene.imgUrl">
    <p>{{currentScene.desc}}</p>
    <ul>
      <li (click)="selectOption(o)" *ngFor="let o of currentScene.opts">{{o.text}}</li>
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
  currentScene: Scene;
  get gameOver():boolean {
    return !this.currentScene.opts.length;
  }
  constructor(public stateHandler: StateHandler){
    stateHandler.subscribeToScene(scene => this.currentScene = scene);
  }
  selectOption(opt:Option){
    this.stateHandler.executeOption(opt);
  }
  selectReset(){
    this.stateHandler.resetAdventure();
  }
}
