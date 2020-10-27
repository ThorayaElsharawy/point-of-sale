import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface User {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent {
  title = 'point-of-sale';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
