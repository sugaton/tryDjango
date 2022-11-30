from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from django.template.loader import render_to_string
from . import forms
from django.db import connection

# Create your views here.
def index(request):
    data = {
        'content' : ["hello"]
    }
    return render(request, "index.html", data)

def sql_exeq(query, args):
    rows = None
    print(query, args)
    with connection.cursor() as cursor:
        cursor.execute(query, args) 
        rows = cursor.fetchall()
    return rows

def sql_form(request):
    if request.POST:
        print("sql_form")
        print(request.POST.get('number1'))
        num = request.POST["number1"]
        sql_rslt = sql_exeq("SELECT id FROM members WHERE id < %s", [num])
        #l = [i for i in range(int(num))]
        l = [item[0] for item in sql_rslt]
        print(l)
        data = {
            'items' : l
        }

        htmlcontent = render_to_string("content.html", data, request)
        return JsonResponse({"content" : htmlcontent})