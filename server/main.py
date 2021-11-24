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

@app.route('/party/add-friend', methods=['POST'])
def add_friend():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    my_id = request.json.get('my_id')
    friend_id = request.json.get('id')

    return cur.callproc('follow', [my_id, friend_id])

@app.route('/party/add-collection', methods=['POST'])
def add_collection():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    email = request.json.get('email')
    collection_name = request.json.get('collection_name')
    
    return cur.callproc('list_create', [email, collection_name])

@app.route('/party/add-element', methods=['POST'])
def add_element():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    list_id = request.json.get('v_collection_id')
    movie_id = request.json.get('v_movie_id')
    hasWatched = 0
    
    return cur.callproc('element_add', [list_id, movie_id, hasWatched])

@app.route('/party/delete-friend', methods=['POST'])
def del_friend():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    my_id = request.json.get('my_id')
    friend_id = request.json.get('id')
    
    return cur.callproc('unfollow', [my_id, friend_id])

@app.route('/party/delete-collection', methods=['POST'])
def del_collection():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    list_id = request.json.get('collection_id')
    
    return cur.callproc('list_delete', [list_id])

@app.route('/party/delete-element', methods=['POST'])
def del_element():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    list_id = request.json.get('collection_id')
    movie_id = request.json.get('movie_id')
    
    return cur.callproc('element_delete', [list_id, movie_id])

@app.route('/party/update-element', methods=['POST'])
def update_element():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    list_id = request.json.get('collection_id')
    movie_id = request.json.get('movie_id')
    
    return cur.callproc('element_update', [list_id, movie_id])

@app.route('/party/view-collection', methods=['POST'])
def view_collection():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    list_id = request.json.get('collection_id')
    elements = []
    
    cur.callproc('get_elements', [list_id])

    for set in cur.stored_results():
        for row in set:
            elements.append(dict(zip(set.column_names,row))) 

    return jsonify({
        'collectionElements': elements
    })

@app.route('/party/search', methods=['POST'])
def search_movies():

    partydb = mysql.connector.connect(user='admin', password='Applesauce12', host='database-project.cbh1cn1j4qvl.us-east-2.rds.amazonaws.com', database='party_planner')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    title = request.json.get('title')
    director = request.json.get('director')
    actor = request.json.get('actor')
    genre = request.json.get('genre')
    keyword = request.json.get('keyword')
    prod_company = request.json.get('prod_company')

    elements = []

    cur.callproc('get_all_movies', [title, director, actor, genre, keyword, prod_company])

    for set in cur.stored_results():
        for row in set:
            elements.append(dict(zip(set.column_names,row))) 

    return jsonify({
        'elements': elements
    })

@app.route('/health-check', methods=['GET'])
def heatlhcheck():
    return 'REEEEEEEE'

app.run()