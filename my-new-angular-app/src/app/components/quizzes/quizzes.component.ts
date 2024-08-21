import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test, Profile } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  headers = ['id','name','date_due','description','max_points','student_points','file','submitter','', 'submit']
  tests: Test[] = [];
  courseID: any;
  current_profile = new Profile;
  submitter: string;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    let profile_id = this.authService.getPk()
    this.authService.getUserProfile(profile_id!).subscribe(res => {
      this.current_profile.first_name = res.first_name
      this.current_profile.last_name = res.last_name
      this.current_profile.pk = res.pk
      this.current_profile.email = res.email
      this.current_profile.date_of_birth = res.date_of_birth
      this.submitter = this.current_profile.first_name + " " + this.current_profile.last_name
      this.authService.getCourse(this.courseID).subscribe(res => {
        for(let i = 0; i < res.tests.length; i++){
          var y = new Test()
          y.id = res.tests[i].id
          y.name = res.tests[i].name
          y.date_due = res.tests[i].date_due
          y.description = res.tests[i].description
          y.max_points = res.tests[i].max_points
          y.student_points = res.tests[i].student_points
          y.file = res.tests[i].file
          y.submitter = res.tests[i].submitter
          if(this.authService.isStaff){
            this.tests.push(y)
          }else{
            if(this.submitter == y.submitter || y.submitter == "Jackson Lu"){
              this.tests.push(y)
            }
          }
        }
      }) 
    })
    
  }

  ngOnInit(): void {
    console.log(this.tests)
  }
  delete_me(x:any){
    this.authService.removeTest(x.toString()).subscribe({
      complete() {window.location.reload()}
    })
  }
  

}
