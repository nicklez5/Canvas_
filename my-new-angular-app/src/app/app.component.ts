import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title="my-new-angular-app"
  profileID: any;
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.doLogout();
  }
  ngOnInit(){
    this.profileID = this.authService.getPk()
  }
}
