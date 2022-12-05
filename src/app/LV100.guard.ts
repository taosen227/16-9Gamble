import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LV100Component } from './lv100/lv100.component';
import { LV110Component } from './lv110/lv110.component';

@Injectable({
  providedIn: 'root'
})
export class LV100Guard implements CanDeactivate<LV100Component> {
  canDeactivate(
    component: LV100Component,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.Deactivate();
  }
}

