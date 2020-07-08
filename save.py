#!/usr/bin/python

# import firebase_admin
# from firebase_admin import credentials
# from firebase_admin import firestore

import os
import firebase_admin
from firebase_admin import credentials
from google.cloud import firestore
from firebase_admin import firestore
import sys

# Use the application default credentials
cred = credentials.Certificate("creds.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

key = sys.argv[1] + ',' + sys.argv[2]
filename = sys.argv[3]

f = open(filename, 'r')
value = "\n".join(f.readlines())
data = {
  str('data') : str(value)
}

db.collection(u'app').document(str(key)).set(data)

# data = {
#   u'name': u'Ithaca',
#   u'state': u'New York',
#   u'country': u'USA'
# }

# db.collection(u'app').document(u'grid').set(data)