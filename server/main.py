import mysql.connector, json, requests, re
from mysql.connector import errorcode
from flask import Flask, jsonify, request
from requests import get
from flask_cors import CORS
import hashlib

app = Flask(__name__)

CORS(app)

@app.route('/party/login', methods=['POST'])
def login():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    email = request.json.get('email') 
    password = request.json.get('password')


    password = hashlib.sha1(password.encode()).hexdigest()

    cur.callproc('user_login', [email, password]) 

    data = []

    for set in cur.stored_results():
        for row in set:
            data.append(dict(zip(set.column_names,row)))


    if (len(data) == 0):
        return jsonify({'email': ''})

    return jsonify(data[0])

@app.route('/party/register', methods=['POST'])
def register():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    email = request.json.get('email')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')

    password = hashlib.sha1(password.encode()).hexdigest()

    return cur.callproc('user_register', [email, first_name, last_name, password])

@app.route('/party/get-home', methods=['POST']) 
def get_home():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    email = request.json.get('email')

    friends, parties, collections = [], [], []

    cur.callproc('get_followed', [email])

    for set in cur.stored_results():
        for row in set:
            friends.append(dict(zip(set.column_names,row))) 
    
    cur.callproc('get_parties', [email])

    for set in cur.stored_results():
        for row in set:
            parties.append(dict(zip(set.column_names,row))) 

    cur.callproc('get_lists', [email])

    for set in cur.stored_results():
        for row in set:
            collections.append(dict(zip(set.column_names,row))) 

    return jsonify({
        'friends': friends,
        'parties': parties,
        'collections': collections
    })


@app.route('/health-check', methods=['GET'])
def heatlhcheck():
    return 'REEEEEEEE'

app.run()