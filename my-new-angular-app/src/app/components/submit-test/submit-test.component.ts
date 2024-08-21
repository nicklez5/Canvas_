import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Test, Profile } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-submit-test',
  templateUrl: './submit-test.component.html',
  styleUrls: ['./submit-test.component.css']
})
export class SubmitTestComponent implements OnInit {
  courseID: any;
  testForm: UntypedFormGroup;
  testID: any;
  test = new Test;
  current_profile = new Profile;
  errorMsg: any;
  fileToUpload: File | null = null;

  constructor(
    public fb: UntypedFormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router 
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.testID = this.actRoute.snapshot.paramMap.get('id2')
    
    this.testForm = this.fb.group({
      file: this.fileToUpload
    })
  }

  ngOnInit(): void {
    
    let profile_id = this.auth_service.getPk()
    this.auth_service.getUserProfile(profile_id!).subscribe(res => {
      this.current_profile.first_name = res.first_name
      this.current_profile.last_name = res.last_name
      this.current_profile.pk = res.pk
      this.current_profile.email = res.email
      this.current_profile.date_of_birth = res.date_of_birth

      this.auth_service.getTest(this.testID).subscribe(res => {
        this.test.id = res.id
        this.test.description = res.description
        this.test.date_due = res.date_due
        this.test.name = res.name
        this.test.file = this.fileToUpload!
        this.test.max_points = res.max_points
        this.test.student_points = res.student_points
        this.test.submitter = this.current_profile.first_name + " " + this.current_profile.last_name


        this.auth_service.getCourse(this.courseID!).subscribe(res => {
          this.testID = res.tests.length + 1
          this.test.id = this.testID
          this.test.student_points = 0
        })
      })

    })
  }
  addTest(): void{
    
    this.auth_service.addTest_Course(this.courseID,this.test).subscribe()
    if(this.fileToUpload){
      this.auth_service.addTest_File(this.testID, this.fileToUpload)
    }
    this.router.navigate(['/course',this.courseID,'quizzes'])
  }
  uploadFile(event: any){
    if(event.target.files && event.target.files.length){
      const file = event.target.files[0]
      this.fileToUpload = file;
    }
  }

}
