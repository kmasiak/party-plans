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

@app.route('/party/get-friends', methods=['POST']) # POST request since we are sending a request body
def get_friends():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    email = request.json.get('email')

    friends = []

    # call the transactionHistory procedure with user ID and account number
    cur.callproc('get_followed', [email])

    # iterate through the result set
    for set in cur.stored_results():
        for row in set:
            friends.append(dict(zip(set.column_names,row))) # append each row to an array
    
    # jsonify the result so the frontend will accept it
    return jsonify({
        'friends': friends
    })


@app.route('/health-check', methods=['GET'])
def heatlhcheck():
    return 'REEEEEEEE'

app.run()