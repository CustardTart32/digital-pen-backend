import json
import glob 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
# NOTE: This is not a secure way of storing a key. Env variables are preferred.
# Note that different operating systems may use different private keys 

json_file = glob.glob("*.json")[0]

cred = credentials.Certificate(json_file)    
firebase_admin.initialize_app(cred, {
    'projectId': 'digital-pen-746a6',
})

db = firestore.client()
doc_id = "SS8lb9KbTlSkQRNYy2iq"
doc_ref = db.collection("ink").document(doc_id)

doc = doc_ref.get()

filename = "../data/uploaded_ink/" + doc_id + ".json"

if doc.exists:
    ink = doc.to_dict()
    with open(filename, 'w') as fp:
        json.dump(ink, fp)
else:
    print(u'No such document!')