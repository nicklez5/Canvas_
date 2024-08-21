from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import FileUploadParser
from .models import Assignment
from .serializers import SerializeAssignment
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers , status 
from .forms import AssignmentForm
@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def api_assignment_list(request):
    if request.method == 'GET':
        assignments = Assignment.objects.all()
        serializer = SerializeAssignment(assignments, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def api_create_assignment(request):
    
    if request.method == 'POST':
        serializer = SerializeAssignment(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def api_detail_assignment_view(request,pk):
    try:
        assignment_post = Assignment.objects.get(pk=pk)
    except Assignment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = SerializeAssignment(assignment_post)
        return Response(serializer.data)



@api_view(['PUT', 'POST', ])
@permission_classes((IsAuthenticated, ))
def api_update_assignment_view(request, pk):
    parser_classes = (FileUploadParser,)
    try:
        assignment_post = Assignment.objects.get(pk=pk)
    except Assignment.DoesNotExist:
        raise Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = SerializeAssignment(assignment_post, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = 'updated'
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        uploaded_file = request.FILES['file']
        if(uploaded_file):
            fs = FileSystemStorage()
            name = fs.save(uploaded_file.name,uploaded_file)
            print(name)
            assignment_post.file = uploaded_file
            assignment_post.save()
            return Response(status=status.HTTP_200_OK)
            
        return Response(status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE', ])
@permission_classes((IsAdminUser, ))
def api_delete_assignment(request,pk):
    try:
        assignment_post = Assignment.objects.get(pk=pk)
    except Assignment.DoesNotExist:
        raise Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        operation = assignment_post.delete()
        data = {}
        if operation:
            data['response'] = 'Delete success'
        return Response(data=data)
    

# Create your views here.
