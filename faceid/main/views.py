from importlib.metadata import requires
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import UserData
from django.db.models import F

import requests
from deepdiff import DeepDiff

import json


def helper_request():
    url = "https://portal-api.asanvolunteers.az/admin/users-info"
    header = {'Token': 'v7QRNTAWWVm1Y8qSrxC5Hm5uFdqrwBvwaiy3tWXJR7GoGU2o8Wzakt8zmDROj0WPWUbp8GQKEoevayTjHEnsDjbk4g6rl5lnj4BUFlmFwcTPa2Ncpwg2E6Fh'}
    r = requests.get(url, headers=header)
    return r.json()


def helper_all_users():
    data = {"data": UserData.objects.all()}
    print(f"data:\t{data}")
    return data


def helper_diff_between_list_of_dicts(list1, list2):
    """
    using pip tool DeepDiff
    """
    diff = DeepDiff(list1, list2, ignore_order=True)
    return diff


def helper_syc():
    data = helper_request()
    # count = data['count']
    data = data['data']
    list(map(lambda d: d.pop('id'), data))
    # data_db = list(UserData.objects.annotate(uid=F('id_user'), first_name=F('fname'), last_name=F('lname'), patronymic=F('pname'), photo=F('image'), ).values('uid', 'first_name', 'last_name', 'patronymic', 'pin', 'branch_name', 'branch_id', 'photo'))
    data_db = list(UserData.objects.values('uid', 'first_name', 'last_name', 'patronymic', 'pin', 'branch_name', 'branch_id', 'photo'))
    result = helper_sync_datas(data_api=data, data_base=data_db)
    return result


def helper_sync_datas(data_api, data_base):
    must_remove_data = list(filter(None, list(map(lambda d: d if d not in data_api else None, data_base))))  # must remove from base
    must_add_data = list(filter(None, list(map(lambda d: d if d not in data_base else None, data_api))))  # must add to base
    must_remove_ids = list(map(lambda uid: uid['uid'], must_remove_data))
    print(
        f'length of base:\t{len(data_base)}\nlength of api:\t{len(data_api)}\nlength of must remove:\t{len(must_remove_data)}\nlength of must add:\t{len(must_add_data)}')
    # delete unwanted datas
    helper_userdata_multiple_delete_by_uid(id_list=must_remove_ids)
    # add new datas
    helper_userdata_multiple_insert_data(must_add_data)
    return must_remove_data, must_add_data


def helper_userdata_multiple_delete_by_uid(id_list):
    UserData.objects.filter(uid__in=id_list).delete()


def helper_userdata_multiple_insert_data(data_list):
    # Create a list of MyModel instances
    objects_to_create = [UserData(**item) for item in data_list]

    # Use bulk_create to insert all objects in a single query
    UserData.objects.bulk_create(objects_to_create)


# Create your views here.
def home_page(r):
    return render(r, "index.html")


def recognition_page(r):
    return render(r, "recognition.html")


@csrf_exempt
def capture_service(r):
    if r.method == 'POST':
        print('POSTed')
        data = json.loads(r.body)
        b64_img = data.get('b64img')
        ip_addr = data.get('ip')
        print(f'\n\n\n\n===================\n{data}\n---------------------\n\n\n\n')
        return JsonResponse({'received': True, 'key1': b64_img, 'key2': ip_addr})
    else:
        return None


@csrf_exempt
def pin_service(r):
    if r.method == 'POST':
        print('pin posted\n')
        data = json.loads(r.body)
        b64_img = data.get('b64img')
        pin = data.get('pin')
        print(data)
        return JsonResponse({'received': True, 'key1': b64_img, 'key2': pin})
    else:
        return None


@csrf_exempt
def list_users(r):
    result = helper_syc()
    return JsonResponse({"mustRemove": result[0], "mustAdd": result[1]})
