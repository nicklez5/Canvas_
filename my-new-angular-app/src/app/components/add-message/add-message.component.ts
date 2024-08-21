import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message, Profile, Thread } from 'src/app/models';
@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  courseID: any;
  threadID: string;
  errorMsg: any;
  thread = new Thread();
  messageForm: UntypedFormGroup;
  profile: Profile;
  profileID: any;
  message = new Message();
  messageID: number;
  date = new Date();
  constructor(
    public fb: UntypedFormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.threadID = this.actRoute.snapshot.paramMap.get('id2')!
    this.messageID = 0
    this.profileID = this.authService.getPk();
    
    this.messageForm = this.fb.group({
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  addMessage(): void{
    this.authService.getCourse(this.courseID).subscribe(res => {
      for(let i = 0; i < res.threads.length;i++){
        for(let j = 0 ; j < res.threads[i].list_messages.length;j++){
          this.messageID = this.messageID + 1
        }
      }
      this.authService.getUserProfile(this.profileID).subscribe(res => {
        this.profile = {
          pk : res.pk,
          email: res.email,
          first_name: res.first_name,
          last_name: res.last_name,
          date_of_birth: res.date_of_birth 
        }
  
        this.message = {
          id: Math.floor(Math.random()*10000),
          author: this.profile.first_name + " " + this.profile.last_name,
          description: this.messageForm.get('description')!.value,
          timestamp: this.date 
        }
        this.authService.addMessage(this.message).subscribe()
        this.authService.getThread(this.threadID).subscribe(res => { 
          this.thread.id = res.id
          this.thread.last_author = res.last_author
          this.thread.last_description = res.last_description
          this.thread.last_timestamp = res.last_timestamp
          this.thread.list_messages = res.last_messages

          this.authService.addMessageThread(this.thread,this.message,this.threadID).subscribe({
            complete() {history.back()}
          })
        })
      })

    })
    
  
  }
}
