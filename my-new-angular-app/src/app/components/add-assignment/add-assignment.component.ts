import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Assignment, Profile } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  courseID: any;
  assignmentForm: UntypedFormGroup;
  assignmentID: number;
  assignmentID_str: string; 
  assignment = new Assignment;
  current_profile = new Profile;
  profile_string: string 
  errorMsg: any;
  fileToUpload: File | null;
  constructor(
    private http: HttpClient,
    public fb: UntypedFormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.assignmentForm = this.fb.group({
      name: [''],
      max_points: [''],
      description: [''],
      date_due: [''],
      submitter: [this.profile_string],
      file: this.fileToUpload
    })
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id')
    let profile_id = this.auth_service.getPk()
    
    this.auth_service.getUserProfile(profile_id!).subscribe(res => {
      this.current_profile = {
        first_name: res.first_name,
        last_name: res.last_name,
        pk: res.pk,
        email: res.email,
        date_of_birth: res.date_of_birth 
      }
      this.profile_string = this.current_profile.first_name + " " + this.current_profile.last_name 
      
      this.courseID = id;
      this.auth_service.getCourse(id!).subscribe(res => {
        console.log(res.assignments.length)
        this.assignmentID = res.assignments.length + 1
      })
      this.assignmentForm = this.fb.group({
        name: [''],
        max_points: [''],
        description: [''],
        date_due: [''],
        submitter: [this.profile_string],
        file: this.fileToUpload
      })
      
    })
    
    
    
  }
  addAssignment(): void{
    let id1 = this.actRoute.snapshot.paramMap.get('id')
    console.log("Adding Assignment")
    this.auth_service.getCourse(id1!).subscribe(res => {
      console.log(res.assignments.length)
      this.assignmentID = res.assignments.length + 1
      this.assignment = {
        id: this.assignmentID,
        name: this.assignmentForm.get('name')?.value,
        date_due : this.assignmentForm.get('date_due')?.value,
        max_points: this.assignmentForm.get('max_points')?.value,
        student_points: 0,
        description: this.assignmentForm.get('description')?.value,
        file: this.assignmentForm.get('file')?.value,
        submitter: this.assignmentForm.get('submitter')?.value 
      }
      this.auth_service.addAssignment_Course(this.courseID,this.assignment).subscribe((res:any) => {
        console.log(res)
        this.assignmentID_str = this.assignmentID.toString()
        if(this.fileToUpload){
          this.auth_service.addAssignment_File(this.assignmentID_str,this.fileToUpload)
        }
        this.router.navigate(['/course',this.courseID,'assignments'])
      })
    })
    
    
  }
  uploadFile(event: any){
    if(event.target.files && event.target.files.length){
      const file = event.target.files[0]
      this.fileToUpload = file;
    }
  }
  
    
  
    
  
}


