import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NbLayoutModule, NbSidebarModule ,NbInputModule, NbIconModule, NbWindowModule, NbButtonModule, NbWindowRef, NbCardModule, NbSelectModule, NbStepperModule} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { HowComponent } from './how/how.component';
import { ReferenceComponent } from './reference/reference.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { StepperComponent } from './stepper/stepper.component';
import { ImportComponent } from './import/import.component';




const NB_MODULES = [CommonModule, FormsModule, 
  ReactiveFormsModule,NbSidebarModule.forRoot(),
  NbLayoutModule,RouterModule,NbSidebarModule,
  NbInputModule,NbIconModule,NbWindowModule.forChild(),
  NbButtonModule,NbCardModule,NbSelectModule,NbStepperModule];

const COMPONENTS = [
  EnterNameComponent,
  HowComponent,
  ReferenceComponent,
  ConfirmComponent,
  StepperComponent,
  ImportComponent
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