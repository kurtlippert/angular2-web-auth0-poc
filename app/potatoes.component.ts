import { Component, OnInit } from '@angular/core';
import { Auth } from './auth.service';
import { Potato } from './potato.interface';
import { Router } from '@angular/router';
import { API_ENDPOINT } from './auth.config';

@Component({
    selector: 'Potatoes',
    template: `
        <table class="table" *ngIf="auth.authenticated()">
            <thead>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th></th>
            </thead>
            <tbody> 
                <tr *ngFor="let potato of potatoes">
                    <td>{{potato.id}}</td>
                    <td>{{potato.name}}</td>
                    <td>{{potato.price}}</td>
                    <td>
                        <button (click)="onSelect(potato)">Details</button>
                    <td>
                </tr>   
            </tbody>
        </table>
`
})

export class PotatoesComponent implements OnInit {

    potatoes: Potato[];

    constructor(private auth: Auth, private router: Router) {}

    ngOnInit() {
        this.auth.lock.on('authenticated', (authResult) => {
            fetch(API_ENDPOINT,
            {
                method: 'GET',
                headers: { authorization: 'bearer ' + this.auth.getToken() }
            }).then(response => {
                response.json().then(json => {
                    this.potatoes = json;
                });
            });
        });

        if (this.auth.authenticated()) {
            fetch(API_ENDPOINT,
            {
                method: 'GET',
                headers: { authorization: 'bearer ' + this.auth.getToken() }
            }).then(response => {
                response.json().then(json => {
                    this.potatoes = json;
                });
            });
        }
    }

    onSelect(potato: Potato) {
        this.router.navigate(['/details', potato.id]);
        localStorage.setItem('current_potato', JSON.stringify(potato));
    }
}
