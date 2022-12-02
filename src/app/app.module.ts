import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbSidebarModule, NbMenuModule, NbIconLibraries, NbIconPackParams, NbCardModule, NbDialogModule, NbSelectModule, NbInputModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LV100Component } from './lv100/lv100.component';
import { LV110Component } from './lv110/lv110.component';
import { ThemeModule } from './component/theme.module';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    LV100Component,
    LV110Component,
  ],
  imports: [
    BrowserModule,
    ThemeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbDialogModule.forRoot(),
    NbSelectModule,
    NbInputModule,
    FormsModule,
    ClipboardModule,
    NbToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private iconLib:NbIconLibraries){
    const nbIconPackParams:NbIconPackParams={
      'LV100':'<img src="assets/icon/LV100.svg" width="25px">',
      'LV110':'<img src="assets/icon/LV110.svg" width="25px">',
    }
    this.iconLib.registerSvgPack('VindictusGamble',nbIconPackParams);
  }
}
