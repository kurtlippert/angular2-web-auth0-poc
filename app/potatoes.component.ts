import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Auth } from './auth.service';
import { Potato } from './potato.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'Potatoes',
    template: `
        <table class="table">
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

export class PotatoesComponent implements OnInit, OnChanges {

    potatoes: Potato[];

    constructor(private auth: Auth, private router: Router) { }

    ngOnInit() {
        fetch('https://bvpoc1.herokuapp.com/api/v1/item/',
        {
            method: 'GET',
            headers: { authorization: 'bearer ' + this.auth.getToken() }
        }).then(response => {
            response.json().then(json => {
                this.potatoes = json;
            });
        });
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    onSelect(potato: Potato) {
        this.router.navigate(['/details', potato.id]);
        localStorage.setItem('current_potato', JSON.stringify(potato));
    }
}
