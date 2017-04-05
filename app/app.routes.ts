import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { PotatoComponent }             from './potato.component';
import { PotatoesComponent }           from './potatoes.component';


const appRoutes: Routes = [
  { path: '', component: PotatoesComponent },
  { path: 'details/:id', component: PotatoComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);