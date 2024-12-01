from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

# Database connection
conn = psycopg2.connect(
    host="localhost",
    database="user_data",
    user="postgres",
    password="LoginData24"
)
cursor = conn.cursor(cursor_factory=RealDictCursor)

# Signup endpoint
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    email = data.get("email")
    password = data.get("password")

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    if user:
        return jsonify({"message": "User already exists"}), 400

    cursor.execute("INSERT INTO users (firstname, lastname, email, password) VALUES (%s, %s, %s, %s)", (firstname, lastname, email, password))
    conn.commit()
    return jsonify({"message": "Signup successful"})

# Login endpoint
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({"message": "Login successful"})

if __name__ == "__main__":
    app.run(debug=True)
