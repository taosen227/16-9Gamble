import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LV100Component } from './lv100.component';

describe('LV100Component', () => {
  let component: LV100Component;
  let fixture: ComponentFixture<LV100Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LV100Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LV100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
