import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDetailComponent } from './edit-profile-detail.component';

describe('EditProfileDetailComponent', () => {
  let component: EditProfileDetailComponent;
  let fixture: ComponentFixture<EditProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
