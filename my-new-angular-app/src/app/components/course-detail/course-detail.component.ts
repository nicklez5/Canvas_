import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment, Course, Profile, Lecture, Test, Thread, Message } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
declare function openNav(): void;
declare function closeNav(): void;
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  profileID: any;
  currentCourse = new Course();
  assignments: Assignment[] = [];
  profiles: Profile[] = [];
  lectures: Lecture[] = [];
  tests: Test[] = [];
  threads: Thread[] = [];

  courseID: any;
  constructor(
    public auth_service: AuthService,
    private actRoute: ActivatedRoute
  ) { 
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.auth_service.getCourse(id!).subscribe(res => {
      for(let i = 0 ; i < res.assignments.length ; i++){
        var x = new Assignment()
        x.name = res.assignments[i].name
        x.date_due = res.assignments[i].date_due
        x.max_points = res.assignments[i].max_points
        x.submitter = res.assignments[i].submitter 
        x.student_points = res.assignments[i].student_points
        x.description = res.assignments[i].description
        x.id = res.assignments[i].id
        x.file = res.assignments[i].file
        this.assignments.push(x);
      }
      for(let i = 0 ; i < res.profiles.length ; i++){
        var y = new Profile()
        y.pk = res.profiles[i].pk
        y.email = res.profiles[i].email
        y.first_name = res.profiles[i].first_name
        y.last_name = res.profiles[i].last_name
        y.date_of_birth = res.profiles[i].date_of_birth
        this.profiles.push(y);
      }
      for(let i = 0 ; i < res.lectures.length ; i++){
        var z = new Lecture()
        z.id = res.lectures[i].id
        z.description = res.lectures[i].description
        z.name = res.lectures[i].name
        z.file = res.lectures[i].file
        this.lectures.push(z)
      }
      for(let i = 0; i < res.tests.length; i++){
        var j = new Test()
        j.id = res.tests[i].id
        j.description = res.tests[i].description
        j.date_due = res.tests[i].date_due
        j.submitter = res.tests[i].submitter
        j.name = res.tests[i].name
        j.file = res.tests[i].file
        j.max_points = res.tests[i].max_points
        j.student_points = res.tests[i].student_points
        this.tests.push(j)
      }
      for(let i = 0; i < res.threads.length; i++){
        var a = new Thread()
        a.id = res.threads[i].id
        a.list_messages = res.threads[i].list_messages 
        a.last_author = res.threads[i].last_author
        a.last_description = res.threads[i].last_description
        a.last_timestamp = res.threads[i].last_timestamp
        this.threads.push(a)
      }
      this.courseID = id;
      console.log("Entering Course Detail Component")
      this.currentCourse.name = res.name;
      this.currentCourse.pk = res.pk;
      this.currentCourse.profiles = this.profiles;
      this.currentCourse.lectures = this.lectures;
      this.currentCourse.assignments = this.assignments;
      this.currentCourse.tests = this.tests;
      this.currentCourse.threads = this.threads;
  })
  this.profileID = this.auth_service.getPk()
}

  ngOnInit(): void {
    
  }
  

}
