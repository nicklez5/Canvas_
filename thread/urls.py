
from django.urls import path 
from rest_framework.urlpatterns import format_suffix_patterns
from . import views 
urlpatterns = [
    path('',views.ThreadList.as_view()),
    path('post/', views.ThreadPost.as_view()),
    path('detail/<str:pk>/',views.ThreadView.as_view()),
    path('delete/<str:pk>/',views.ThreadDelete.as_view()),
    path('add_message/<str:pk>/',views.ThreadAddMessage.as_view()),
    path('delete_message/<str:pk>/',views.ThreadRemoveMsg.as_view())
]