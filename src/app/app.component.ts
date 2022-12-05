import { Component } from '@angular/core';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { StepperComponent } from './component/stepper/stepper.component';
import { Menu_Items } from './model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sideBarService:NbSidebarService,
    private dialogService:NbDialogService){}
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
}
