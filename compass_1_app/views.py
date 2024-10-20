from django.shortcuts import render

def compass_view(request):
        # فرض کنیم این عدد از جایی محاسبه شده است
    needle_rotation = 100
    context = {
        'needle_rotation': needle_rotation,
    }
    return render(request, 'compass.html',context)

