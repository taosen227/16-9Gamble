import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LV110Component } from './lv110.component';

describe('LV110Component', () => {
  let component: LV110Component;
  let fixture: ComponentFixture<LV110Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LV110Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LV110Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
