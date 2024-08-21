import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTestComponent } from './submit-test.component';

describe('SubmitTestComponent', () => {
  let component: SubmitTestComponent;
  let fixture: ComponentFixture<SubmitTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
