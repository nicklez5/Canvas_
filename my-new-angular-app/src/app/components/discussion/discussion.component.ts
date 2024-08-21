import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread, Message } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  headers = ['id','last_author', 'last_description', 'last_timestamp','','etc']
  threads: Thread[] = [];
  courseID: any;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    
  }

  ngOnInit(): void {
    this.authService.getCourse(this.courseID).subscribe(res => {
      console.log(res)
      for(let i = 0; i < res.threads.length; i++){
        var y = new Thread()
        y.id = res.threads[i].id 
        y.list_messages = res.threads.list_messages 
        y.last_author = res.threads[i].last_author
        y.last_description = res.threads[i].last_description
        y.last_timestamp = res.threads[i].last_timestamp
        this.threads.push(y)
        
      }
    })
  }
  delete_me(x:any){
    this.authService.removeThread(x.toString()).subscribe({
      complete() {window.location.reload()}
    })
  }

}
