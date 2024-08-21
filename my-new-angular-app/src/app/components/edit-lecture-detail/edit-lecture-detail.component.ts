import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Lecture } from 'src/app/models';
@Component({
  selector: 'app-edit-lecture-detail',
  templateUrl: './edit-lecture-detail.component.html',
  styleUrls: ['./edit-lecture-detail.component.css']
})
export class EditLectureDetailComponent implements OnInit {
  lectureForm: UntypedFormGroup;
  lectureID: any;
  courseID: any;
  lecture: Lecture;
  fileToUpload: File | null = null;
  fileName: string;
  errorMsg: any;
  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.lectureID = this.actRoute.snapshot.paramMap.get('id2')
    this.lectureForm = this.fb.group({
      description: [''],
      name: [''],
      file: this.fileToUpload
    })
    this.authService.getLecture(this.lectureID).subscribe((res:Lecture) => {
      console.log(res)
      this.lectureForm.setValue({
        name: res.name,
        description: res.description,
        file: res.file 
      })
    })
  }

  ngOnInit(): void {
  }
  editLecture(): void{
    this.lecture = {
      id: this.lectureID,
      description: this.lectureForm.get('description')!.value,
      name: this.lectureForm.get('name')!.value,
      file: this.lectureForm.get('file')!.value
    }
    this.authService.editLecture(this.lecture,this.lectureID).subscribe()
    if(this.fileToUpload){
      this.authService.addLecture_File(this.lectureID, this.fileToUpload)
    }
    this.router.navigate(['/course',this.lectureID,'lectures'])
  }
  uploadFile(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList[0].name)
      this.fileName = fileList[0].name
      this.fileToUpload = fileList[0]
    }
  }
}
