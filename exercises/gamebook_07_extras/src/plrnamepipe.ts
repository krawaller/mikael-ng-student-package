import {Pipe, PipeTransform} from '@angular/core'

import { UI } from './interfaces';

import { StateHandler } from './statehandler';

@Pipe({
  name: "plrname",
  pure: false // Since we depend on local "state" too (the ui we subscribe to)
})
export class PlrNamePipe implements PipeTransform {
  constructor(stateHandler: StateHandler){
    stateHandler.subscribeToUI(ui => this.ui = ui);
  }
  ui: UI
  transform(value){
    return value.replace(
      'PLAYERNAME',
      this.ui.name || "Player"
    );
  }
}
