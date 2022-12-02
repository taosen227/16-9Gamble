import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NbLayoutModule, NbSidebarModule ,NbInputModule, NbIconModule, NbWindowModule, NbButtonModule, NbWindowRef, NbCardModule, NbSelectModule} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { HowComponent } from './how/how.component';
import { ReferenceComponent } from './reference/reference.component';




const NB_MODULES = [CommonModule, FormsModule, 
  ReactiveFormsModule,NbSidebarModule.forRoot(),
  NbLayoutModule,RouterModule,NbSidebarModule,
  NbInputModule,NbIconModule,NbWindowModule.forChild(),
  NbButtonModule,NbCardModule,NbSelectModule];

const COMPONENTS = [
  EnterNameComponent,
  HowComponent,
  ReferenceComponent
];

@NgModule({
  imports: [CommonModule,...NB_MODULES,ReactiveFormsModule,FormsModule],
  exports: [CommonModule,...COMPONENTS],
  declarations: [
    ...COMPONENTS
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
    };
  }
}