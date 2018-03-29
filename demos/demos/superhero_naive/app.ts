import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>Edit name: <input [value]="name" (input)="setName($event.target.value)"></p>
    <button (click)="setName('Batman')">put on costume</button>
    <p>I'm {{name}}</p>
    `
})
export class AppComponent {
  name = 'Bruce'
  setName(txt){
    this.name = txt
  }
}
