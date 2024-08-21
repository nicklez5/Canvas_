import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Lecture, Profile } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.css']
})
export class AddLectureComponent implements OnInit {
  fileName = '';
  courseID: any;
  lectureForm: UntypedFormGroup;
  current_profile = new Profile;
  profile_string: string 
  lectureID: number;
  lectureID_str: string;
  lecture = new Lecture;
  errorMsg: any;
  fileToUpload: File | null = null;
  constructor(
    public fb: UntypedFormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.auth_service.getCourse(this.courseID!).subscribe(res => {
      this.lectureID = res.lectures.length + 1
    })
    this.lectureForm = this.fb.group({
      name: [''],
      description: [''],
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
        console.log(res.lectures.length)
        this.lectureID = res.lectures.length + 1
      })
      this.lectureForm = this.fb.group({
        name: [''],
        description: [''],
        file: this.fileToUpload
      })
    })
  }
  addLecture(): void{
    let id1 = this.actRoute.snapshot.paramMap.get('id')
    this.auth_service.getCourse(id1!).subscribe(res => {
      console.log(res)
      this.lectureID = res.lectures.length + 1
      this.lecture = {
        id : this.lectureID,
        name: this.lectureForm.get('name')?.value,
        description: this.lectureForm.get('description')?.value,
        file: this.lectureForm.get('file')?.value
      }
    this.auth_service.addLecture_Course(this.courseID, this.lecture).subscribe((res:any) => {
      console.log(res)
      this.lectureID_str = this.lectureID.toString()
      if(this.fileToUpload){
        this.auth_service.addLecture_File(this.lectureID_str, this.fileToUpload)
      }
      this.router.navigate(['/course',this.courseID,'lectures'])
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
