import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Profile } from 'src/app/models';


@Component({
  selector: 'app-edit-profile-detail',
  templateUrl: './edit-profile-detail.component.html',
  styleUrls: ['./edit-profile-detail.component.css']
})
export class EditProfileDetailComponent implements OnInit {
  profileForm: UntypedFormGroup;
  profileID: any;
  profile: Profile;
  errorMsg: any;
  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.profileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      date_of_birth: ['']
  })
}

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.profileID = id;
    });
    this.authService.getUserProfile(this.profileID).subscribe(
      (data) => this.profile = data,
      (error) => this.errorMsg = error
    )
  }
  editProfile(): void{
    this.profile = {
      pk : this.profileID,
      email: this.profile.email, 
      first_name : this.profileForm.get('firstname')!.value, 
      last_name : this.profileForm.get('lastname')!.value,
      date_of_birth : this.profileForm.get('date_of_birth')!.value 
    }
    this.authService.editUserProfile(this.profile,this.profileID).subscribe(response => {this.router.navigate(['profile', this.profileID])});
   
    
  }

}
