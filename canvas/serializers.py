from rest_framework import serializers
from course.serializers import SerializeCourse
from .models import Canvas
class SerializeCanvas(serializers.ModelSerializer):
    list_courses = SerializeCourse(read_only=True,many=True)
    current_course = SerializeCourse(read_only=True,many=False)
    class Meta:
        model = Canvas 
        fields = ['pk','list_courses','current_course']

    