import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from './home.component';
import { DetailsComponent }            from './details.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);