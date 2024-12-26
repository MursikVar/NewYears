from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Разрешает запросы из других источников

# Создание подключения к базе данных
def init_db():
    conn = sqlite3.connect('contacts.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Contacts (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Email TEXT NOT NULL,
        Message TEXT NOT NULL
    );
    ''')
    conn.commit()
    conn.close()

# Инициализация базы данных
init_db()

# Эндпоинт для сохранения данных
@app.route('/api/contact', methods=['POST'])
def save_contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    conn = sqlite3.connect('contacts.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Contacts (Name, Email, Message) VALUES (?, ?, ?)", (name, email, message))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Contact saved successfully.'}), 201

# Эндпоинт для получения всех контактов
@app.route('/api/contacts', methods=['GET'])
def get_contacts():
    conn = sqlite3.connect('contacts.db')
    cursor = conn.cursor()
    cursor.execute("SELECT Name, Email, Message FROM Contacts")
    contacts = cursor.fetchall()
    conn.close()

    return jsonify(contacts)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
