import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Assignment } from 'src/app/models';


@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignmentForm: UntypedFormGroup;
  assignmentID: any;
  courseID: any;
  assignment: Assignment;
  fileToUpload: File | null;
  errorMsg: any;
  fileName: string;
  blob: any;
  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.assignmentID = this.actRoute.snapshot.paramMap.get('id2')
    this.assignmentForm = this.fb.group({
      name : [''],
      max_points: [''],
      student_points: [''],
      date_due: [''],
      description: [''],
      submitter: [''],
      file: this.fileToUpload
    })
    this.authService.getAssignment(this.assignmentID).subscribe((res:Assignment) => {
      console.log(res)
      this.assignmentForm.setValue({
        name: res.name,
        max_points: res.max_points,
        student_points: res.student_points,
        date_due: res.date_due,
        description: res.description,
        file: res.file,
        submitter: res.submitter 
      })
      
    
  })}

  ngOnInit(): void {
    
  }
  editAssignment(): void{
    
    this.assignment = {
      id: this.assignmentID,
      name: this.assignmentForm.get('name')?.value,
      student_points: this.assignmentForm.get('student_points')?.value,
      description: this.assignmentForm.get('description')?.value,
      date_due: this.assignmentForm.get('date_due')?.value,
      max_points: this.assignmentForm.get('max_points')?.value,
      file: this.assignmentForm.get('file')?.value,
      submitter: this.assignmentForm.get('submitter')?.value
    }
    //console.log(this.assignment)
    this.authService.editAssignment(this.assignment,this.assignmentID).subscribe()
    if(this.fileToUpload){
      this.authService.addAssignment_File(this.assignmentID,this.fileToUpload)
    }
    this.router.navigate(['/course',this.courseID,'assignments'])
  }
  uploadFile(event: Event){
    //const reader = new FileReader()
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList[0].name)
      this.fileName = fileList[0].name
      this.fileToUpload = fileList[0]
      
    }
    
  }
  

}
