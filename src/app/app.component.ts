import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Menu_Items } from './model/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private sideBarService:NbSidebarService){}
  title = 'VindictusGamble';
  menu = Menu_Items
  toggleSideBar(){
    this.sideBarService.toggle(true,"sideBar")
  }
}
