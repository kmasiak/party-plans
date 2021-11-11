import mysql.connector, json, requests, re
from mysql.connector import errorcode
from flask import Flask, jsonify, request
from requests import get
from flask_cors import CORS
import hashlib

partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='mydb')

cur = partydb.cursor(dictionary=True)

partydb.autocommit = True

app = Flask(__name__)

CORS(app)

@app.route('/party/login', methods=['POST'])
def login():

    email = request.json.get('email') 
    password = request.json.get('password')


    password = hashlib.sha1(password.encode()).hexdigest()

    data = [] 

    cur.callproc('user_login', [email, password]) 

    for set in cur.stored_results():
        for row in set:
            data.append(dict(zip(set.column_names,row)))
    return jsonify(data)

@app.route('/health-check', methods=['GET'])
def heatlhcheck():
    return 'REEEEEEEE'

app.run()