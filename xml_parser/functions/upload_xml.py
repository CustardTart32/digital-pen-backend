from read_xml import read_ink, get_digital_ink, construct_time_series, get_time_gaps
import numpy as np
import glob

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

json_file = glob.glob("*.json")[0]

cred = credentials.Certificate(json_file)
firebase_admin.initialize_app(cred, {
    'projectId': 'digital-pen-746a6',
})

db = firestore.client()

for file in glob.glob("../data/datasets/*1*.inkml"):
    print("Uploading", file)

    raw_file = file.split("/")[3]
    file_ref = db.collection("files").document(raw_file)

    batch = db.batch()

    lines_arr, lines = read_ink(file)
    ref_dict = get_digital_ink(file)

    # Add line ids to root level directory
    data = {
        "line_ids": lines
    }

    batch.set(file_ref, data, merge=True)

    # Add individual text lines to subcollections
    for i in range(0, len(lines)):
        line_id = lines[i]
        line_data = lines_arr[i]

        word_ids = [str(j) for j in range(0, len(line_data))]

        words = {}

        words["word_ids"] = word_ids

        for j in range(0, len(line_data)):
            words[word_ids[j]] = line_data[j]

        line_ref = file_ref.collection("lines").document(line_id)

        batch.set(line_ref, words)

    # Add digital ink data with references as keys
    # for ref in ref_dict.keys():
    #     x, y, t, p = construct_time_series(ref_dict[ref].strip())

    #     t_filled = get_time_gaps(t)
    #     x_filled = list(np.interp(t_filled, t, x))
    #     y_filled = list(np.interp(t_filled, t, y))
    #     p_filled = list(np.interp(t_filled, t, p))

    #     ink = {
    #         'x': x_filled,
    #         'y': y_filled,
    #         't': t_filled,
    #         'p': p_filled,
    #     }

    #     ink_ref = file_ref.collection("ink").document(ref)

    #     batch.set(ink_ref, ink)

    batch.commit()
