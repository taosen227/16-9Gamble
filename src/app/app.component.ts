import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { StepperComponent } from './component/stepper/stepper.component';
import { slideInAnimation } from './model/anime';
import { Menu_Items } from './model/menu';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  constructor(private sideBarService:NbSidebarService,
    private dialogService:NbDialogService,
    private contexts:ChildrenOutletContexts){}
  title = 'VindictusGamble';
  menu = Menu_Items
  toggleSideBar(){
    this.sideBarService.toggle(true,"sideBar")
  }
  Open(){
    window.open("https://th.bing.com/th/id/R.d84daac52e2dd78e895f774f689ecb65?rik=NgOy8uu7d7bQ7g&pid=ImgRaw&r=0")
  }
  OpenInfo(){
    this.dialogService.open(StepperComponent)
  }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
