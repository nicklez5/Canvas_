import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: UntypedFormGroup;
  
  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router
  ){
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      password2: ['']
    })
  }

  ngOnInit(): void {
  
  }
  
  registerUser() {
    this.authService.signUp(this.signupForm.get('username')!.value,this.signupForm.get('email')!.value,this.signupForm.get('password')!.value,this.signupForm.get('password2')!.value).subscribe((res) => {
      if(res){
        this.signupForm.reset()
        this.router.navigate(['signin']);
      }
    })
  }
  
  

}
