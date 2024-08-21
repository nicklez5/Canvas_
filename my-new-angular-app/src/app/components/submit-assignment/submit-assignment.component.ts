import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Assignment, Profile }  from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {
  courseID: any;
  assignmentForm: UntypedFormGroup;
  assignmentID: any;
  assignment = new Assignment;
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
    this.assignmentID = this.actRoute.snapshot.paramMap.get('id2')
    
    
    
    this.assignmentForm = this.fb.group({
      file: [null]
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

      this.auth_service.getAssignment(this.assignmentID).subscribe(res => {
        this.assignment.id = res.id
        this.assignment.description = res.description
        this.assignment.date_due = res.date_due
        this.assignment.name = res.name 
        this.assignment.file = this.fileToUpload!
        this.assignment.max_points = res.max_points
        this.assignment.student_points = res.student_points 

        this.assignment.submitter = this.current_profile.first_name + " " + this.current_profile.last_name
        this.auth_service.getCourse(this.courseID!).subscribe( res => {
          this.assignmentID = res.assignments.length + 1
          this.assignment.id = this.assignmentID
          this.assignment.student_points = 0
        })
      })
    })
    
  }
  addAssignment(): void{
    this.auth_service.addAssignment_Course(this.courseID,this.assignment).subscribe()
    if(this.fileToUpload){
      this.auth_service.addAssignment_File(this.assignmentID, this.fileToUpload)
    }
    this.router.navigate(['/course', this.courseID, 'assignments'])
  }
  uploadFile(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList[0].name)
      this.fileToUpload = fileList[0]
    }
  }

}
