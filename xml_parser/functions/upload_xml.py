from read_xml import read_ink, get_digital_ink, construct_time_series, get_time_gaps
import numpy as np
import glob

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
# NOTE: This is not a secure way of storing a key. Env variables are preferred.
cred = credentials.Certificate(
    "digital-pen-746a6-firebase-adminsdk-18pgv-f7c6bc15b5.json")
firebase_admin.initialize_app(cred, {
    'projectId': 'digital-pen-746a6',
})

db = firestore.client()

# for file in glob.glob("datasets/*1*.inkml"):
#     print(file.split("/")[1])


for file in glob.glob("datasets/*1*.inkml"):
    print("Uploading", file)

    raw_file = file.split("/")[1]
    file_ref = db.collection("files").document(raw_file)

    batch = db.batch()

    words_arr, ref_arr = read_ink(file)
    ref_dict = get_digital_ink(file)

    refs = {}

    for i in range(0, len(words_arr)):
        refs[str(i)] = ref_arr[i]

    data = {
        'words': words_arr,
        "refs": refs
    }

    batch.set(file_ref, data)

    for ref in ref_dict.keys():
        x, y, t, p = construct_time_series(ref_dict[ref].strip())

        t_filled = get_time_gaps(t)
        x_filled = list(np.interp(t_filled, t, x))
        y_filled = list(np.interp(t_filled, t, y))
        p_filled = list(np.interp(t_filled, t, p))

        ink = {
            'x': x_filled,
            'y': y_filled,
            't': t_filled,
            'p': p_filled,
        }

        ink_ref = file_ref.collection("ink").document(ref)

        batch.set(ink_ref, ink)

    batch.commit()
