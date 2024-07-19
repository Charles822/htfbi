from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db import transaction
from django.db.models import Q, F, Value, Func, ExpressionWrapper, DecimalField
from django.db.models.aggregates import Count, Max, Min, Avg, Sum
from django.db.models.functions import Concat
from django.contrib.contenttypes.models import ContentType



def say_hello(request):

    return render(request, 'hello.html', {
            'name': 'Mosh'})
    