import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  headers = ['first_name', 'last_name', 'date_of_birth', 'etc']
  profiles: Profile[] = [];
  courseID: any;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.authService.getCourse(this.courseID).subscribe(res => {
      for(let i = 0; i < res.profiles.length; i++){
        var x = new Profile()
        x.pk = res.profiles[i].pk
        x.first_name = res.profiles[i].first_name
        x.email = res.profiles[i].email
        x.last_name = res.profiles[i].last_name
        x.date_of_birth = res.profiles[i].date_of_birth
        this.profiles.push(x) 
      }
    })
           
  }

  ngOnInit(): void {
  }
  delete_me(first_name: string, last_name: string, email: string, date_of_birth: Date, pk:string): void{
    this.authService.removeStudent_Course(
      first_name,
      last_name,
      email,
      date_of_birth,
      pk).subscribe({
        complete() { window.location.reload()}
      })
  }
}
