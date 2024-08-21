import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, Profile, Test } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  headers = ['Id', 'Name', 'Date_due', 'Description', 'Max_points', 'Student_points', 'File', 'Grade', 'Submitter']
  headers2 = ['Overall Grade', 'Grade Pct']
  
  tests: Test[] = [];
  assignments: Assignment[] = [];
  grades: any[] = [];
  top_grades: any[] = [];
  bot_grades: any[] = []
  grade_str: string;
  xyz: number;
  overallGrade_pct: number;
  courseID: any;
  current_profile = new Profile;
  submitter: string;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router 
  ) {
    let profile_id = this.authService.getPk()
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.authService.getUserProfile(profile_id!).subscribe( res => {
      this.current_profile.first_name = res.first_name
      this.current_profile.last_name = res.last_name
      this.current_profile.pk = res.pk
      this.current_profile.email = res.email
      this.current_profile.date_of_birth = res.date_of_birth 
      this.submitter = this.current_profile.first_name + " " + this.current_profile.last_name 

      this.authService.getCourse(this.courseID).subscribe(res => {
        for(let i = 0 ; i < res.tests.length; i++){
          var y = new Test()
          y.id = res.tests[i].id
          y.name = res.tests[i].name
          y.date_due = res.tests[i].date_due
          y.description = res.tests[i].description
          y.max_points = res.tests[i].max_points
          y.student_points = res.tests[i].student_points
          y.file = res.tests[i].File
          y.submitter = res.tests[i].submitter
          if(this.authService.isStaff){
            this.top_grades.push(y.student_points)
            this.bot_grades.push(y.max_points)
            this.tests.push(y)
          }else{
            if(this.submitter == y.submitter){
              this.top_grades.push(y.student_points)
              this.bot_grades.push(y.max_points)
              this.tests.push(y)
            }
          }
        }
  
        for(let i = 0; i < res.assignments.length; i++){
          var x = new Assignment()
          x.name = res.assignments[i].name
          x.id = res.assignments[i].id
          x.description = res.assignments[i].description 
          x.date_due = res.assignments[i].date_due
          x.max_points = res.assignments[i].max_points
          x.student_points = res.assignments[i].student_points
          x.file = res.assignments[i].file
          x.submitter = res.assignments[i].submitter
          if(this.authService.isStaff){
            this.top_grades.push(x.student_points)
            this.bot_grades.push(x.max_points)
            this.assignments.push(x)
          }else{
            if(this.submitter == x.submitter){
              this.top_grades.push(x.student_points)
              this.bot_grades.push(x.max_points)
              this.assignments.push(x)
            }
          }
          
        }
  
        console.log(this.top_grades)
        var top_sum = this.top_grades.reduce(function(a,b){ return a+b; }, 0)
        var bot_sum = this.bot_grades.reduce(function(a,b){ return a+b; }, 0)
        console.log(top_sum)
        this.overallGrade_pct = top_sum/bot_sum * 100
        this.calculate()
      })
    })
    
    
    
  }
  calculate(): void{
    if(this.overallGrade_pct < 50){
      this.grade_str = "F" 
    }else if((this.overallGrade_pct < 70) && (this.overallGrade_pct > 60)){
      this.grade_str = "D"
    }else if((this.overallGrade_pct < 80) && (this.overallGrade_pct >= 70)){
      this.grade_str = "C"
    }else if((this.overallGrade_pct < 90) && (this.overallGrade_pct >= 80)){
      this.grade_str = "B"
    }else{
      this.grade_str = "A"
    }
  }
  ngOnInit(): void {
  }


}
