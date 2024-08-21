import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Assignment, Canvas, Course, Lecture, Profile, Test, Thread } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  course: Course;
  profileID: any;
  currentPk: any;
  profile: Profile;
  profiles: Profile[] = []
  assignments: Assignment[] = [];
  lectures: Lecture[] = [];
  tests: Test[] = [];
  threads: Thread[] = [];
  canvas_pk: any;
  courseForm: UntypedFormGroup;
  errorMsg: any;
  constructor(
    public fb: UntypedFormBuilder,
    public auth_service : AuthService,
    private actRoute: ActivatedRoute,
    public router: Router 
  ) {
    this.courseForm = this.fb.group({
      name: ['']
    })
    this.profileID = this.auth_service.getPk()
    this.auth_service.getUserProfile(this.profileID).subscribe((res:any) => {
      this.profile = {
        pk: res.pk,
        email: res.email,
        first_name: res.first_name,
        last_name: res.last_name,
        date_of_birth: res.date_of_birth
      }
    })
    this.profiles.push(this.profile)
    this.auth_service.getCanvas(this.profileID).subscribe((res:any) => {
      this.currentPk = res.list_courses.length + 1
      this.canvas_pk = res.pk 
    })
  }

  ngOnInit(): void {
    
  }
  addCourse(): void{
    this.course = {
      pk: this.currentPk,
      name: this.courseForm.get('name')!.value, 
      lectures: this.lectures,
      assignments: this.assignments,
      profiles: this.profiles,
      tests: this.tests,
      threads: this.threads
    }
    this.auth_service.postCourse(this.course).subscribe((res:any)=>{
      console.log("Posted Course")
      console.log(res)
    })

    this.auth_service.addCourse_Canvas(this.course,this.canvas_pk).subscribe()
    this.auth_service.addMyself_Course(this.profile, this.course.pk).subscribe()
    this.router.navigate(['/home'])


  }

}
