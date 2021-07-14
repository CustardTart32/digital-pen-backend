import json

import numpy as np
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
# NOTE: This is not a secure way of storing a key. Env variables are preferred.
# Note that different operating systems may use different private keys 
cred = credentials.Certificate(
    "digital-pen-746a6-firebase-adminsdk-18pgv-5541130c80.json")    
firebase_admin.initialize_app(cred, {
    'projectId': 'digital-pen-746a6',
})

db = firestore.client()

doc_ref = db.collection("ink").document("87cLwHGOjfeSRggvUXaK")

doc = doc_ref.get()

filename = "ink.json"

if doc.exists:
    ink = doc.to_dict()
    with open('ink.json', 'w') as fp:
        json.dump(ink, fp)
else:
    print(u'No such document!')