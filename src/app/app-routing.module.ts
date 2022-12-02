import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LV100Component } from './lv100/lv100.component';
import { LV110Component } from './lv110/lv110.component';

const routes: Routes = [
  {
    path:'LV100',
    component:LV100Component
  },
  {
    path:'LV110',
    component:LV110Component
  },
  {
    path:'',
    redirectTo:'LV100',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'LV100',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
