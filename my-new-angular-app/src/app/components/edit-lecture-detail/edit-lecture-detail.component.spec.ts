import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLectureDetailComponent } from './edit-lecture-detail.component';

describe('EditLectureDetailComponent', () => {
  let component: EditLectureDetailComponent;
  let fixture: ComponentFixture<EditLectureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLectureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLectureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
