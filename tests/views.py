from django.core.files.storage import FileSystemStorage
from django.shortcuts import render
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import FileUploadParser
from .models import Test
from .serializers import SerializeTest
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers , status 
from .forms import TestForm

@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def api_test_list(request):
    if request.method == 'GET':
        tests = Test.objects.all()
        serializer = SerializeTest(tests, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def api_create_test(request):

    if request.method == 'POST':
        serializer = SerializeTest(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def api_detail_test_view(request,pk):
    try:
        Test_post = Test.objects.get(pk=pk)
    except Test.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = SerializeTest(Test_post)
        return Response(serializer.data)

@api_view(['PUT', 'POST', ])
@permission_classes((IsAuthenticated, ))
def api_update_test_view(request, pk):
    parser_classes = (FileUploadParser,)
    try:
        test_post = Test.objects.get(pk=pk)
    except Test.DoesNotExist:
        raise Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = SerializeTest(test_post, data=request.data)
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
            name = fs.save(uploaded_file.name, uploaded_file)
            print(name)
            test_post.file = uploaded_file
            test_post.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['DELETE', ])
@permission_classes((IsAdminUser, ))
def api_delete_test(request,pk):
    try:
        test_post = Test.objects.get(pk=pk)
    except Test.DoesNotExist:
        raise Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        operation = test_post.delete()
        data = {}
        if operation:
            data['response'] = 'Delete success'
        return Response(data=data)
    

# Create your views here.
