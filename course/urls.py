from django.urls import path 
from rest_framework.urlpatterns import format_suffix_patterns 
from . import views 


urlpatterns = [
    path('', views.CourseList.as_view()),
    path('post/', views.CoursePost.as_view()),
    path('detail/<str:pk>/', views.CourseDetail.as_view()),
    path('delete/<str:pk>/', views.CourseDelete.as_view()),
    path('change_course_name/<str:pk>/', views.CourseChangeName.as_view()),
    path('add_lecture/<str:pk>/', views.CourseAddLecture.as_view()),
    path('add_assignment/<str:pk>/',views.CourseAddAssignment.as_view()),
    path('add_student/<str:pk>/',views.CourseAddStudent.as_view()),
    path('remove_student/<str:pk>/',views.CourseRemoveStudent.as_view()), 
    path('add_test/<str:pk>/',views.CourseAddTest.as_view()),
    path('add_thread/<str:pk>/',views.CourseAddThread.as_view())
]
