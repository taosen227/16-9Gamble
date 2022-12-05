import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LV110Component } from './lv110/lv110.component';

@Injectable({
  providedIn: 'root'
})
export class LV110Guard implements CanDeactivate<LV110Component> {
  canDeactivate(
    component: LV110Component,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.Deactivate();
  }
}
