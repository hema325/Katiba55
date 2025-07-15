/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditMediasComponent } from './edit-medias.component';

describe('EditMediasComponent', () => {
  let component: EditMediasComponent;
  let fixture: ComponentFixture<EditMediasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMediasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
