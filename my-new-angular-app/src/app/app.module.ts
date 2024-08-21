import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './shared/authconfig.interceptor'
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { EditProfileDetailComponent } from './components/edit-profile-detail/edit-profile-detail.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddLectureComponent } from './components/add-lecture/add-lecture.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { Home2Component } from './components/home2/home2.component';
import { BackbuttonDirective } from './_directives/backbutton.directive';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { EditAssignmentComponent } from './components/edit-assignment/edit-assignment.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { StudentsComponent } from './components/students/students.component';
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { EditLectureDetailComponent } from './components/edit-lecture-detail/edit-lecture-detail.component';
import { GradesComponent } from './components/grades/grades.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditQuizzesComponent } from './components/edit-quizzes/edit-quizzes.component';
import { AddQuizzesComponent } from './components/add-quizzes/add-quizzes.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { DiscussionViewComponent } from './components/discussion-view/discussion-view.component';
import { DiscussionAddComponent } from './components/discussion-add/discussion-add.component';
import { AddMessageComponent } from './components/add-message/add-message.component';
import { SubmitAssignmentComponent } from './components/submit-assignment/submit-assignment.component';
import { SubmitTestComponent } from './components/submit-test/submit-test.component';


@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        SigninComponent,
        RegisterComponent,
        ProfileDetailComponent,
        EditProfileDetailComponent,
        AddCourseComponent,
        AddLectureComponent,
        AddAssignmentComponent,
        CourseDetailComponent,
        Home2Component,
        BackbuttonDirective,
        AssignmentsComponent,
        EditAssignmentComponent,
        LecturesComponent,
        StudentsComponent,
        QuizzesComponent,
        EditLectureDetailComponent,
        GradesComponent,
        AddStudentComponent,
        EditQuizzesComponent,
        AddQuizzesComponent,
        DiscussionComponent,
        DiscussionViewComponent,
        DiscussionAddComponent,
        AddMessageComponent,
        SubmitAssignmentComponent,
        SubmitTestComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
