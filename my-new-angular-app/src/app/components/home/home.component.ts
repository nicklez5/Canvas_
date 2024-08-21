import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/auth.service';
import { Canvas, Course, Profile } from 'src/app/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  canvas = new Canvas();
  list_courses : Course[] = [];
  profileID: any;
  profile: Profile;
  constructor(private authService: AuthService) {
    this.profileID = this.authService.getPk();
  }

  ngOnInit(): void {
    console.log("Calling Get Canvas")
    this.authService.getCanvas(this.profileID).subscribe((data) => {
      this.canvas.pk = data["pk"]
      this.canvas.list_courses = data["list_courses"],
      this.canvas.current_course = data["current_course"]
    });
    console.log(this.canvas)
    if(this.canvas.list_courses){
      for(let i = 0; i < this.canvas.list_courses.length; i++){
        this.list_courses.push(this.canvas.list_courses[i])
      }
    }
  }
  delete_course(x : Number){
    this.authService.getUserProfile(this.profileID).subscribe((data) => {
      this.profile = {
        pk: data.pk,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth
      }
    });
    this.authService.deleteMyself_Course(this.profile, x.toString()).subscribe()
    this.authService.delete_Course(x.toString()).subscribe()
  }

}
