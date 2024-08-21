from django.shortcuts import render, redirect 
from rest_framework.decorators import action, permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response 
from rest_framework import status, viewsets
from course.serializers import SerializeCourse
from .serializers import SerializeCanvas
from .models import Canvas 
from course.models import Course
 
class CanvasList(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SerializeCanvas

    def get(self,request,format=None):
        canvas = Canvas.objects.all()
        serializer = self.serializer_class(canvas,many=True)
        return Response(serializer.data)

    
class CanvasView(APIView):
    serializer_class = SerializeCanvas
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Canvas.objects.get(pk=pk)
        except Canvas.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND
    
    def get(self, request , pk , format=None):
        canvas = self.get_object(pk)
        serializer = SerializeCanvas(canvas)
        return Response(serializer.data)

class CanvasDelete(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Canvas.objects.get(pk=pk)
        except Canvas.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def delete(self, request, pk , format=None):
        canvas = self.get_object(pk)
        canvas.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CanvasRemoveCourse(APIView):
   
    serializer_class = SerializeCanvas
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Canvas.objects.get(pk=pk)
        except Canvas.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND
    
    def put(self,request,pk,format=None):
        data = request.data
        canvas = self.get_object(pk)
        course_name = data['name']
        find_course = Course.objects.get(name=course_name)
        if find_course is None:
            return status.HTTP_404_NOT_FOUND
        canvas.list_courses.remove(find_course)
        canvas.current_course=None
        canvas.save()
        serializer = self.serializer_class(canvas)
        return Response(serializer.data)


class CanvasAddCourse(APIView):
    serializer_class = SerializeCanvas
    permission_classes = [IsAdminUser]

    def get_object(self,pk):
        try:
            return Canvas.objects.get(pk=pk)
        except Canvas.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def put(self,request,pk,format=None):
        data = request.data
        canvas = self.get_object(pk)
        course_name = data['name']

        try:
            course = Course.objects.get(name=course_name)
        except Course.DoesNotExist:
            course = None 
        
        canvas.list_courses.add(course)
        canvas.current_course=course
        canvas.save()
        serializer = SerializeCanvas(canvas)
        return Response(serializer.data)
        

class CanvasCourseView(APIView):
    serializer_class = SerializeCanvas
    permission_classes = [IsAuthenticated]

    def get_object(self,pk):
        try:
            return Canvas.objects.get(pk=pk)
        except Canvas.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def put(self,request,pk,format=None):
        canvas = self.get_object(pk)
        course_name = request.data['name']
        find_course = Course.objects.get(name=course_name)
        if find_course is None:
            return status.HTTP_404_NOT_FOUND
        canvas.current_course = find_course
        serializer = self.serializer_class(data=canvas.__dict__)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST) 




        

    
# Create your views here.
