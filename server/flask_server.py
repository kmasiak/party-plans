import mysql.connector, requests
from flask import Flask, jsonify, request
from flask_cors import CORS
import hashlib
import requests


# This python flask app acts as the intermediary between the front end (api.js) and the database
# It runs on port 5000 with the specified routes to be called with a JSON request body
app = Flask(__name__)

CORS(app)

# Calls the user_register procedure in the database to insert a user to the user table
@app.route('/party/register', methods=['POST'])
def register():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    email = request.json.get('email')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')

    # Passwords are stored in the database as a sha1 hash for security purposes
    password = hashlib.sha1(password.encode()).hexdigest()

    return cur.callproc('user_register', [email, first_name, last_name, password])

# Calls the user_login procedure in the database to compare the input credentials with those in the database
# Returns the user's email if credentials are valid 
@app.route('/party/login', methods=['POST'])
def login():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    email = request.json.get('email') 
    password = request.json.get('password')

    # Passwords are stored in the database as a sha1 hash for security purposes
    password = hashlib.sha1(password.encode()).hexdigest()

    cur.callproc('user_login', [email, password]) 

    data = []

    for set in cur.stored_results():
        for row in set:
            data.append(dict(zip(set.column_names,row)))


    if (len(data) == 0):
        return jsonify({'email': ''})

    return jsonify(data[0])

# Calls the get_followed, get_parties, and get_lists procedures for a user's home page
# Returns with data for a user's freinds list, collection list, and party list
@app.route('/party/get-home', methods=['POST']) 
def get_home():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
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

# Calls the follow procedure in the database to add a freind to a user's friend list. 
# Inserts a record to the follower table
@app.route('/party/add-friend', methods=['POST'])
def add_friend():

    partydb = mysql.connector.connect(
        user='**REMOVED**', 
        password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    my_id = request.json.get('my_id')
    friend_id = request.json.get('id')

    return cur.callproc('follow', [my_id, friend_id])

# Calls the unfollow procedure to remove a friend from a user's friend list
# Deletes a record in the follower table
@app.route('/party/delete-friend', methods=['POST'])
def del_friend():

    partydb = mysql.connector.connect(
        user='**REMOVED**', 
        password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')    
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    my_id = request.json.get('my_id')
    friend_id = request.json.get('id')
    
    return cur.callproc('unfollow', [my_id, friend_id])

# Calls the list_create procedure to add a collection to the user's collection list
# Inserts a row into the collection table
@app.route('/party/add-collection', methods=['POST'])
def add_collection():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    email = request.json.get('email')
    collection_name = request.json.get('collection_name')
    
    return cur.callproc('list_create', [email, collection_name])

# Calls the list_delete procedure to delete a collection to the user's collection list
# Deletes a row from the collection table and any associated rows in the element table
@app.route('/party/delete-collection', methods=['POST'])
def del_collection():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    list_id = request.json.get('collection_id')
    
    return cur.callproc('list_delete', [list_id])

# Calls the get_elements procedure in order to view all the movies in a specific collection
# Returns rows from the element table
@app.route('/party/view-collection', methods=['POST'])
def view_collection():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    list_id = request.json.get('collection_id')
    elements = []
    
    cur.callproc('get_elements', [list_id])

    for set in cur.stored_results():
        for row in set:
            elements.append(dict(zip(set.column_names,row))) 

    return jsonify({
        'collectionElements': elements
    })

# Calls the duplicate_list procedure to duplicate a friend's list to a user's account
# Adds a row to the collection table and any applicable rows to the element table. 
@app.route('/party/duplicate-collection', methods=['POST'])
def duplicate_collection():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    email = request.json.get('email')
    list_name = request.json.get('collection_name')
    list_id = request.json.get('collection_id')
    
    return cur.callproc('duplicate_list', [email, list_name, list_id])

# Calls the element_add procedure to add a movie to a user's collection
# Inserts a row into the element table 
@app.route('/party/add-element', methods=['POST'])
def add_element():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    list_id = request.json.get('v_collection_id')
    movie_id = request.json.get('v_movie_id')
    hasWatched = 0
    
    return cur.callproc('element_add', [list_id, movie_id, hasWatched])

# Calls the element_delete procedure to remove a movie to a user's collection
# Deletes a row into the element table
@app.route('/party/delete-element', methods=['POST'])
def del_element():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    list_id = request.json.get('collection_id')
    movie_id = request.json.get('movie_id')
    
    return cur.callproc('element_delete', [list_id, movie_id])

# Calls the element_update procedure to update the watch status of an element in a colletion
# Updates the watch status of a row in the element table
@app.route('/party/update-element', methods=['POST'])
def update_element():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    list_id = request.json.get('collection_id')
    movie_id = request.json.get('movie_id')
    
    return cur.callproc('element_update', [list_id, movie_id])

# Calls the get_all_movies procedure to search for movies based on any applied filters
# Returns movie information from the movie table for a user to view and add to a collection
@app.route('/party/search', methods=['POST'])
def search_movies():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
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

# Calls the get_movie_details, get_movie_cast, get_movie_genre, get_movie_keywords, 
# get_movie_prod_co, and get_movie_reviews procedures and returns the data in json format
# to be used in the movie details screen. 
@app.route('/party/get-movie-contents', methods=['POST']) 
def get_movie_contents():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    movie_id = request.json.get('movie_id')

    contents, reviews = [], []

    cur.callproc('get_movie_details', [movie_id])

    for set in cur.stored_results():
        for row in set:
            contents.append(dict(zip(set.column_names,row)))

    cur.callproc('get_movie_cast', [movie_id])

    for set in cur.stored_results():
        for row in set:
            contents.append(dict(zip(set.column_names,row))) 

    cur.callproc('get_movie_genre', [movie_id])

    for set in cur.stored_results():
        for row in set:
            contents.append(dict(zip(set.column_names,row))) 

    cur.callproc('get_movie_keywords', [movie_id])

    for set in cur.stored_results():
        for row in set:
            contents.append(dict(zip(set.column_names,row))) 

    cur.callproc('get_movie_prod_co', [movie_id])

    for set in cur.stored_results():
        for row in set:
            contents.append(dict(zip(set.column_names,row)))

    cur.callproc('get_movie_reviews', [movie_id])

    for set in cur.stored_results():
        for row in set:
            reviews.append(dict(zip(set.column_names,row)))

    return jsonify({
        'm_contents': contents,
        'm_reviews': reviews
    })

# Retrieve the link to a movie poster image
# This image is displayed on the movie details screen
@app.route('/party/poster-link', methods=['POST'])
def get_link():

    # Input variables
    movie_id = request.json.get('movie_id') 

    return jsonify({
        'poster_link': "add link to poster here"
    })

# Calls the review_create procedure to add a review to a movie on the movie details screen.
# Inserts a row into the review table
@app.route('/party/add-review', methods=['POST'])
def add_review():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    u_email = request.json.get('user_email')
    movie_id = request.json.get('v_movie_id')
    rating = request.json.get('v_rating')
    comments = request.json.get('v_comments')
    
    return cur.callproc('review_create', [u_email, movie_id, rating, comments])

# Calls the review update procedure to update a user's review rating and comments on a movie
# Updates a row in the review table
@app.route('/party/update-review', methods=['POST'])
def update_review():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    u_email = request.json.get('user_email')
    movie_id = request.json.get('v_movie_id')
    rating = request.json.get('v_rating')
    comments = request.json.get('v_comments')
    
    return cur.callproc('review_update', [u_email, movie_id, rating, comments])

# Calls the party_create procedure in order to add a party to a user's party list
# Inserts a record into the event and party tables
@app.route('/party/create-party', methods=['POST'])
def create_party():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    movie_id = request.json.get('movie_id')
    time = request.json.get('party_time')
    link = 'https://google.com'
    user_email = request.json.get('email')
    
    return cur.callproc('party_create', [movie_id, time, link, user_email])

# Calls the party_delete procedure to remove a party from the database
# Deletes a row from the event table and any applicable rows from the party table. 
@app.route('/party/delete-party', methods=['POST'])
def del_party():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    party_id = request.json.get('party_id')
    
    return cur.callproc('party_delete', [party_id])

# Calls the party_add_user procedure to add a user via email to a watch party
# Inserts a row into the party table
@app.route('/party/add-party-users', methods=['POST'])
def add_party_users():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    user_email = request.json.get('email')
    party_id = request.json.get('party_id')
    
    return cur.callproc('party_add_user', [user_email, party_id])

# Calls the party_delete_user procedure to remove a user from a watch party
# Deletes a row from the party table. 
@app.route('/party/delete-user-party', methods=['POST'])
def del_user_party():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    user_id = request.json.get('user_id')
    party_id = request.json.get('party_id')
    
    return cur.callproc('party_delete_user', [user_id, party_id])

# Calls the party_update_time procedure in order to update the date and time for a party
# Updates a row in the event table
@app.route('/party/update-party-time', methods=['POST'])
def update_party_time():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    party_id = request.json.get('party_id')
    new_time = request.json.get('new_time')
    
    return cur.callproc('party_update_time', [party_id, new_time])

# Calls the get_party_users procedure to populate a list of users invited to a party
# Returns rows from the party table
@app.route('/party/get-party-users', methods=['POST'])
def get_party_users():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    party_id = request.json.get('party_id')
    users = []
    
    cur.callproc('get_party_users', [party_id])

    for set in cur.stored_results():
        for row in set:
            users.append(dict(zip(set.column_names,row))) 

    return jsonify({
        'party_users': users
    })

# Calls the get_recommended_users procedure to recommend users to invite to a party
# These users must be your friend, cannot already be invited, and must have the movie
# in one of their collections
@app.route('/party/get-recommended-users', methods=['POST']) 
def get_recommended_users():

    partydb = mysql.connector.connect(
        user='**REMOVED**', password='**REMOVED**', 
        host='**REMOVED**', 
        database='**REMOVED**')
    partydb.autocommit = True
    cur = partydb.cursor(dictionary=True)

    # Input variables
    email = request.json.get('email')
    party_id = request.json.get('party_id')

    users = []

    cur.callproc('get_recommended_users', [email, party_id])

    for set in cur.stored_results():
        for row in set:
            users.append(dict(zip(set.column_names,row)))

    return jsonify({
        'rec_users': users,
    })

app.run()