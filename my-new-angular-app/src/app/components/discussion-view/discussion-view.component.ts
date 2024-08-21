import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread, Message } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-discussion-view',
  templateUrl: './discussion-view.component.html',
  styleUrls: ['./discussion-view.component.css']
})
export class DiscussionViewComponent implements OnInit {
  headers = ['id','author','description','timestamp']
  messages: Message[] = [];
  courseID: any;
  threadID: any;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router 
  ) {
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.threadID = this.actRoute.snapshot.paramMap.get('id2')
    this.authService.getThread(this.threadID).subscribe( res => {
      for(let i = 0; i < res.list_messages.length; i++){
        var x = new Message()
        x.author = res.list_messages[i].author
        x.description = res.list_messages[i].description
        x.id = res.list_messages[i].id
        x.timestamp = res.list_messages[i].timestamp
        this.messages.push(x)
      }
    })
    
  }

  ngOnInit(): void {
  }

}
