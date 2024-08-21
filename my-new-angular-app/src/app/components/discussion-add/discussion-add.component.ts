import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message, Profile,Thread } from 'src/app/models';
@Component({
  selector: 'app-discussion-add',
  templateUrl: './discussion-add.component.html',
  styleUrls: ['./discussion-add.component.css']
})
export class DiscussionAddComponent implements OnInit {
  courseID: any;
  messageForm: UntypedFormGroup;
  messageID: number;
  threadID: number;
  thread = new Thread;
  profile = new Profile;
  profileID: any;
  message = new Message;
  messages: Message[] = [];
  date = new Date();
  constructor(
    public fb: UntypedFormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router 
  ) {
    this.threadID = 0
    this.messageID = 0 
    this.messageForm = this.fb.group({
      description: ['']
    })
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    
    
  }

  ngOnInit(): void {
  }
  addMessage(): void{
    this.auth_service.getCourse(this.courseID).subscribe(res => {
      
      for(let i = 0; i < res.threads.length; i++){
        for(let j = 0; j < res.threads[i].list_messages.length; j++){
          this.messageID = this.messageID + 1
        }
        this.threadID = this.threadID + 1 
      }
      this.profileID = this.auth_service.getPk();
      this.auth_service.getUserProfile(this.profileID).subscribe(res => {
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
        this.auth_service.addMessage(this.message).subscribe()
        this.messages.push(this.message)

        this.thread = {
          id: this.threadID,
          list_messages: this.messages,
          last_author: this.profile.first_name + " " + this.profile.last_name,
          last_description: this.messageForm.get('description')!.value,
          last_timestamp: this.date
        }
        this.auth_service.addThread(this.thread).subscribe()
        this.auth_service.addMessageThread(this.thread, this.message, this.threadID.toString()).subscribe()
        this.auth_service.addThread_Course(this.thread, this.courseID).subscribe({
          complete() {history.back()}
        })

      })

    })

  }
}
