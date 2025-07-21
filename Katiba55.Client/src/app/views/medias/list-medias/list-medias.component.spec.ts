/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListMediasComponent } from './list-medias.component';

describe('ListMediasComponent', () => {
  let component: ListMediasComponent;
  let fixture: ComponentFixture<ListMediasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMediasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
