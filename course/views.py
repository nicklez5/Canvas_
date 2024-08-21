from django.shortcuts import get_object_or_404, render
from django.conf import settings
from rest_framework.decorators import action, permission_classes 
from .models import Course
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework import serializers, status, viewsets 
from .serializers import SerializeCourse
from lectures.models import Lecture 
from assignments.models import Assignment
from profiles.models import Profile 
from tests.models import Test
from users.models import CustomUser
from canvas.models import Canvas
from thread.models import Thread 
import django.dispatch 

class CourseList(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SerializeCourse

    def get(self,request,format=None):
        courses = Course.objects.all()
        serializer = self.serializer_class(courses,many=True)
        return Response(serializer.data)
    
class CoursePost(APIView):
    permission_classes = [IsAdminUser]

    def post(self,request,format=None):
        serializer = SerializeCourse(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        course = self.get_object(pk)
        serializer = SerializeCourse(course)
        return Response(serializer.data)

    
        
 

class CourseChangeName(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def put(self,request,pk,format=None):
        data = request.data 
        course = self.get_object(pk)
        if course is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course_name = data["name"]
        course.name = course_name
        course.save()
        serializer = SerializeCourse(course)
        return Response(serializer.data)
        

    
class CourseAddLecture(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk)
        lecture_id = data["id"]
        lecture_obj = Lecture.objects.get(id=lecture_id)
        if lecture_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.lectures.add(lecture_obj)
        course.save()
        serializer = SerializeCourse(course)
        return Response(serializer.data)


class CourseAddAssignment(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk)
        assignment_id = data["id"]
        assignment_obj = Assignment.objects.get(id=assignment_id)
        if assignment_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.assignments.add(assignment_obj)
        course.save()
        serializer = SerializeCourse(course)
        return Response(serializer.data)



class CourseAddStudent(APIView):
    student_added = django.dispatch.Signal()
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        data = request.data
        course = self.get_object(pk)
        user_obj = CustomUser.objects.get(email=data["email"])
        if user_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        profile_obj = Profile.objects.get(first_name=data["first_name"],last_name=data["last_name"],date_of_birth=data["date_of_birth"])
        if profile_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        student_canvas = Canvas.objects.get(user=user_obj)
        if student_canvas is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        student_canvas.list_courses.add(course)
        student_canvas.current_course = course
        student_canvas.save()
        course.profiles.add(profile_obj)
        course.save()
        serializer = SerializeCourse(course)
        return Response(serializer.data)

class CourseRemoveStudent(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try: 
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self, request, pk , format=None):
        data = request.data
        course = self.get_object(pk)
        user_obj = CustomUser.objects.get(email=data["email"])
        if user_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        profile_obj = Profile.objects.get(first_name=data["first_name"],last_name=data["last_name"],date_of_birth=data["date_of_birth"])
        if profile_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        student_canvas = Canvas.objects.get(user=user_obj)
        if student_canvas is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        student_canvas.list_courses.remove(course)
        student_canvas.current_course = None
        student_canvas.save()
        course.profiles.remove(profile_obj)
        course.save()
        serializer = SerializeCourse(course)
        return Response(serializer.data)
    

class CourseDelete(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404

    def delete(self, request, pk , format=None):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CourseAddTest(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk)
        test_id = data["id"]
        test_obj = Test.objects.get(id=test_id)
        if test_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        course.tests.add(test_obj)
        course.save()
        serializer = SerializeCourse(course)
        return Response(serializer.data)

class CourseAddThread(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self,pk):
        try:
            return Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            raise Http404
    
    def put(self,request,pk,format=None):
        data = request.data
        course = self.get_object(pk)
        thread_id = data["id"]
        thread_obj = Thread.objects.get(id=thread_id)
        if thread_obj is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        course.threads.add(thread_obj)
        course.save()
        serializer = SerializeCourse(course)
        return Response(serializer.data)
        


    




    
        

        

    

# Create your views here.
