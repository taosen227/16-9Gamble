import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LV100Guard} from './LV100.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LV100Component } from './lv100/lv100.component';
import { LV110Guard } from './lv110.guard';
import { LV110Component } from './lv110/lv110.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    data: { animation: 'dashboard' }
  },
  {
    path:'LV100',
    component:LV100Component,
    canDeactivate:[LV100Guard],
    data: { animation: 'LV100' }
  },
  {
    path:'LV110',
    component:LV110Component,
    canDeactivate:[LV110Guard],
    data: { animation: 'LV110' }
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'dashboard',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
