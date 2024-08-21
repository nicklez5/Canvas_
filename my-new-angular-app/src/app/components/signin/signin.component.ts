import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: UntypedFormGroup;
  
  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public router: Router
  ){
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }
  

  ngOnInit(): void {
    
  }
  
  loginUser(){
    this.authService.signIn(this.signinForm.get('email')!.value,this.signinForm.get('password')!.value)
  }
  
}
