import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddLectureComponent } from './components/add-lecture/add-lecture.component';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { AddQuizzesComponent } from './components/add-quizzes/add-quizzes.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { DiscussionAddComponent } from './components/discussion-add/discussion-add.component';
import { DiscussionViewComponent } from './components/discussion-view/discussion-view.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { EditAssignmentComponent } from './components/edit-assignment/edit-assignment.component';
import { EditLectureDetailComponent } from './components/edit-lecture-detail/edit-lecture-detail.component';
import { EditProfileDetailComponent } from './components/edit-profile-detail/edit-profile-detail.component';
import { EditQuizzesComponent } from './components/edit-quizzes/edit-quizzes.component';
import { GradesComponent } from './components/grades/grades.component';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home2/home2.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component'
import { StudentsComponent } from './components/students/students.component';
import { SubmitAssignmentComponent } from './components/submit-assignment/submit-assignment.component';
import { SubmitTestComponent } from './components/submit-test/submit-test.component';
import { AuthGuard} from "./shared/auth.guard";
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin'},
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home2', component: Home2Component },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileDetailComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/edit', component: EditProfileDetailComponent, canActivate: [AuthGuard] },
  { path: 'course/add', component: AddCourseComponent, canActivate: [AuthGuard] },
  { path: 'course/:id', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/assignments', component: AssignmentsComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/assignments/add', component: AddAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/assignments/:id2/submit', component: SubmitAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/assignments/:id2/edit',component: EditAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/lectures', component: LecturesComponent, canActivate: [AuthGuard ]},
  { path: 'course/:id/lectures/add', component: AddLectureComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/lectures/:id2/edit', component: EditLectureDetailComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/students', component: StudentsComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/students/add', component: AddStudentComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/quizzes', component: QuizzesComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/quizzes/add', component: AddQuizzesComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/quizzes/:id2/edit', component: EditQuizzesComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/quizzes/:id2/submit', component: SubmitTestComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/discussion', component: DiscussionComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/discussion/:id2/view', component: DiscussionViewComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/discussion/add', component: DiscussionAddComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/discussion/:id2/add', component: AddMessageComponent, canActivate: [AuthGuard]},
  { path: 'course/:id/grades', component: GradesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
