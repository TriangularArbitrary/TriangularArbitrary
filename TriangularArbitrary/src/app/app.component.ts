import { LocalStorageKeys } from './Enums/Enums';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TriangularArbitrary';
  localStorageKeys = Object.keys(LocalStorageKeys);

  constructor() {

    // On Construction of the App Component,
    // get the localStorage Key/Value pair for storage (Could move pieces out to other components,
    // could remove if we use firebase or something else for storage)
    // Simply add the key to the LocalStorageKeys enum and set key/value where you need to it. (localStorage.setItem(...))

    this.localStorageKeys.forEach(element => {
      localStorage.getItem(element);
      console.log(element);
    });
  }
}


