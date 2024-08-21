import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, Profile } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  headers = ["id", "name", "date_due", "max_points","student_points","description","file","submitter", "etc", "submit"]
  assignments: Assignment[] = [];
  dictionary = {};
  courseID: any;
  current_profile = new Profile;
  submitter: string; 
  constructor(
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    let profile_id = this.auth_service.getPk()
    this.auth_service.getUserProfile(profile_id!).subscribe((res:any) => {
      this.current_profile.pk = res.pk
      this.current_profile.first_name = res.first_name
      this.current_profile.last_name = res.last_name 
      
      this.current_profile.email = res.email
      this.current_profile.date_of_birth = res.date_of_birth 

      this.submitter = this.current_profile.first_name + " " + this.current_profile.last_name
      this.auth_service.getCourse(this.courseID!).subscribe(res => {
        for(let i = 0; i < res.assignments.length; i++){
          var x = new Assignment()
          x.name = res.assignments[i].name
          x.date_due = res.assignments[i].date_due
          x.max_points = res.assignments[i].max_points
          if(!res.assignments[i].student_points){
            x.student_points = 0
          }else{
            x.student_points = res.assignments[i].student_points
          }
          x.description = res.assignments[i].description
          x.id = res.assignments[i].id
          x.file = res.assignments[i].file 
          x.submitter = res.assignments[i].submitter
          if(this.auth_service.isStaff){
            this.assignments.push(x);
          }else{
            if(this.submitter == x.submitter || x.submitter == "Jackson Lu"){
              this.assignments.push(x) 
            }
          }
        }
      }) 
    })
    
      
    
    
    
      console.log(this.assignments)
      
  }


  

  ngOnInit(): void {
  }
  delete_me(x: any){
    this.auth_service.deleteAssignment(x.toString()).subscribe({
      complete() {window.location.reload()}
    })
    
  }
  edit_me(x: any){
    
  }
}
