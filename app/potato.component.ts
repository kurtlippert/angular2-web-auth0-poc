import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Potato } from './potato.interface';
import { Auth } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'Potato',
    template: `
        <div *ngIf="auth.authenticated()">
            <h3>{{ potato.name }}</h3>
            <ul class="list-group">
                <li class="list-group-item">{{ potato.description }}</li>
                <li class="list-group-item">Created at: {{ potato.created_at }}</li>
                <li class="list-group-item">Modified at: {{ potato.modified_at }}</li>
            </ul>
        </div>`
})

export class PotatoComponent implements OnInit, OnChanges {

    potato: Potato;

    constructor(private auth: Auth, private router: Router) {}

    ngOnInit() {
        this.potato = JSON.parse(localStorage.getItem('current_potato'));
        localStorage.removeItem('current_potato');
    }

    ngOnChanges(changes: SimpleChanges) { }
}
