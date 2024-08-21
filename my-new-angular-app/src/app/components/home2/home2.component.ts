import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Canvas, Course, Profile } from 'src/app/models';
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {
  canvas = new Canvas();
  list_courses : Course[] = [];
  profileID: any;
  profile: Profile;
  constructor(private authService: AuthService) { 
    this.profileID = this.authService.getPk();
  }

  ngOnInit(): void {
    this.authService.getCanvas(this.profileID).subscribe((data) => {
      this.canvas.pk = data["pk"]
      this.canvas.list_courses = data["list_courses"]
      this.canvas.current_course = data["current_course"]
    });
    if(this.canvas.list_courses){
      for(let i = 0; i < this.canvas.list_courses.length; i++){
        this.list_courses.push(this.canvas.list_courses[i])
      }
    }
  }

}
