import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LungComponent } from './lung.component';

describe('LungComponent', () => {
  let component: LungComponent;
  let fixture: ComponentFixture<LungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
