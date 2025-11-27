from flask import Flask, request, jsonify, abort
import pymysql
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)

# MySQL config - change to your actual config
db_config = {
    'host': 'localhost',
    'user': 'youruser',
    'password': 'yourpassword',
    'database': 'yourdatabase'
}

CORS(app)  # This will allow CORS for all domains on all route

def get_db_connection():
    conn = pymysql.connect(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        database=db_config['database'],
        cursorclass=pymysql.cursors.DictCursor
    )
    return conn

# Create Alert
@app.route('/alerts', methods=['POST'])
def create_alert():
    data = request.json
    required_fields = ['gpslocation', 'user', 'description', 'type']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing fields'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    query = """INSERT INTO alerts (gpslocation, user, description, created_at, type)
               VALUES (%s, %s, %s, %s, %s)"""
    created_at = datetime.utcnow()
    values = (data['gpslocation'], data['user'], data['description'], created_at, data['type'])
    cursor.execute(query, values)
    conn.commit()
    alert_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({'id': alert_id, 'message': 'Alert created'}), 201

# Read all alerts
@app.route('/alerts', methods=['GET'])
def get_alerts():
    alerts = [
        {
            'id': 1,
            'gpslocation': '15.07548,120.6450',
            'user': 'Marc Jayson',
            'description': 'Flood alert near Angeles',
            'created_at': datetime.utcnow().isoformat(),  # ISO formatted string for easier JSON parsing
            'type': 'flood'
        },
        {
            'id': 2,
            'gpslocation': '15.13287,120.5926',
            'user': 'Richard Gutierez',
            'description': 'Landslide reported',
            'created_at': datetime.utcnow().isoformat(),
            'type': 'Flood'
        },
        {
            'id': 3,
            'gpslocation': '15.13458,120.5789',
            'user': 'Shem Pinto',
            'description': 'Earthquake tremors felt',
            'created_at': datetime.utcnow().isoformat(),
            'type': 'Flood'
        },
        # Add more static alerts here as needed
    ]
    return jsonify(alerts)

# Read alert by id
@app.route('/alerts/<int:alert_id>', methods=['GET'])
def get_alert(alert_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alerts WHERE id = %s", (alert_id,))
    alert = cursor.fetchone()
    cursor.close()
    conn.close()
    if alert is None:
        return jsonify({'error': 'Alert not found'}), 404
    return jsonify(alert)

# Update alert by id
@app.route('/alerts/<int:alert_id>', methods=['PUT'])
def update_alert(alert_id):
    data = request.json
    fields = ['gpslocation', 'user', 'description', 'type']
    update_data = {field: data[field] for field in fields if field in data}
    if not update_data:
        return jsonify({'error': 'No valid fields to update'}), 400

    set_clause = ', '.join(f"{field} = %s" for field in update_data.keys())
    values = list(update_data.values())
    values.append(alert_id)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"UPDATE alerts SET {set_clause} WHERE id = %s", values)
    conn.commit()
    affected = cursor.rowcount
    cursor.close()
    conn.close()

    if affected == 0:
        return jsonify({'error': 'Alert not found'}), 404
    return jsonify({'message': 'Alert updated'})

# Delete alert by id
@app.route('/alerts/<int:alert_id>', methods=['DELETE'])
def delete_alert(alert_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM alerts WHERE id = %s", (alert_id,))
    conn.commit()
    affected = cursor.rowcount
    cursor.close()
    conn.close()

    if affected == 0:
        return jsonify({'error': 'Alert not found'}), 404
    return jsonify({'message': 'Alert deleted'})

if __name__ == '__main__':
    app.run(debug=True)
