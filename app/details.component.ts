import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Potato } from './potato.interface';

@Component({
    selector: 'Details',
    template: `
        <h3>{{ potato.name }}</h3>`
})

export class DetailsComponent implements OnInit, OnChanges {

    potato: Potato;

    ngOnInit() {
        this.potato = JSON.parse(localStorage.getItem('current_potato'));
        localStorage.removeItem('current_potato');
    }

    ngOnChanges(changes: SimpleChanges) { }
}
