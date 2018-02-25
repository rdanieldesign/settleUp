import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelledInputComponent } from './labelled-input.component';

describe('LabelledInputComponent', () => {
  let component: LabelledInputComponent;
  let fixture: ComponentFixture<LabelledInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelledInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
