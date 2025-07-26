/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoqsEditComponent } from './boqs-edit.component';

describe('BoqsEditComponent', () => {
  let component: BoqsEditComponent;
  let fixture: ComponentFixture<BoqsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
