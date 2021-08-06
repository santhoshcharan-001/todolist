from django.http.response import HttpResponse,JsonResponse
from django.shortcuts import render
from .models import Tasks
# Create your views here.
def santhosh(request):
    return render(request,"home.html")

def get_tasks(request):
    objs=Tasks.objects.all()
    li=[]
    for ele in objs:
        dic={}
        dic["id"] = ele.id
        dic["title"]=ele.title
        dic["description"]=ele.description
        dic["time"]=ele.time
        dic["date"]=ele.date
        dic["priority"]=ele.priority
        dic["status"]=ele.status
        li.append(dic)
    return JsonResponse({"data":li})

def delete(request):
    id = request.GET.get("id")
    obj=Tasks.objects.filter(id=id)
    if obj.exists():
        obj[0].delete()
    return JsonResponse({})
    
def add_task(request):
    title=request.GET.get("title")
    des=request.GET.get("des")
    priority=request.GET.get("priority")
    date=request.GET.get("date")
    time=request.GET.get("time")
    status=request.GET.get("status")
    if request.GET.get("adding")=="true":
        form=Tasks.objects.create(title=title,description=des,
        priority=priority,date=date,time=time,status=status)
        form.save()
        return JsonResponse({ "id" : form.id })
    else:
        edit_id=request.GET.get("edit_id")
        print("murari",edit_id)
        r=Tasks.objects.filter(id=edit_id).update(title=title,description=des,
        priority=priority,date=date,time=time,status=status)
        return HttpResponse("santhosh")