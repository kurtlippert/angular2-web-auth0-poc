import { Component }  from '@angular/core';
import { Auth }       from './auth.service';

@Component({
  selector: 'home',
  template: `
    <Potatoes></Potatoes>`
})

export class HomeComponent {
  constructor(private auth: Auth) {}

};
