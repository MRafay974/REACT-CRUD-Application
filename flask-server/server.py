from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_DB'] = "flask_db"

mysql = MySQL(app)



@app.route('/')
def index():
    return "Hello Wrold"

@app.route('/accept', methods=['POST'])
def submit():
    data = request.json  # Get the JSON data from the request
    id = data['id']
    name = data['Name']
    age = data['Age']
    gender = data['Gender']

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO nurse (id, name, age, gender) VALUES (%s, %s, %s, %s)", (id, name, age, gender))
    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Data inserted successfully"}), 201



@app.route('/patient', methods=['POST'])
def submit_patients():
    data = request.json  # Get the JSON data from the request
    id = data['id']
    name = data['Name']
    age = data['Age']
    gender = data['Gender']
    nurse_id=data["Nurse_id"]

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO patient (id, name, gender,age,nurse_id) VALUES (%s, %s, %s, %s,%s)", (id, name,gender, age ,nurse_id))
    mysql.connection.commit()
    cur.close()

    return jsonify(data)





@app.route('/nurse', methods=['GET'])
def get_users():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, name, age, gender FROM nurse")
    rows = cur.fetchall()
    cur.close()

    # Convert to a list of dictionaries
    users = [{"id": row[0], "name": row[1], "gender": row[3],"age": row[2], } for row in rows]
    
    return jsonify(users)


@app.route('/get_patient', methods=['GET'])
def get_patients():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, name, gender, age,nurse_id FROM patient")
    rows = cur.fetchall()
    cur.close()

    # Convert to a list of dictionaries
    users = [{"id": row[0], "name": row[1], "gender": row[2],"age": row[3],"nurse_id":row[4] } for row in rows]
    
    return jsonify(users)





@app.route('/nurse/<int:id>', methods=['GET'])
def get_users_id(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, age, gender FROM nurse WHERE id = %s", [id])
    row = cur.fetchone()  # Fetch one row since id should be unique

    cur.close()

    if row:
        user = {
            "name": row[0],   
            "age": row[1],
            "gender": row[2],
        }
        return jsonify(user)  
    

 

@app.route('/patient/<int:id>', methods=['GET'])
def get_patient_id(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, age, gender,nurse_id FROM patient WHERE id = %s", [id])
    row = cur.fetchone()  # Fetch one row since id should be unique

    cur.close()

    if row:
        user = {
            "name": row[0],   
            "age": row[1],
            "gender": row[2],
            "nurse_id":row[3],
        }
        return jsonify(user)     
   



@app.route('/delete_nurse/<int:id>', methods=['DELETE'])
def delete_nurse(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM nurse WHERE id = %s", [id])

    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Nurse record deleted successfully"}), 200



@app.route('/delete_patient/<int:id>', methods=['DELETE'])
def delete_patient(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM patient WHERE id = %s", [id])

    mysql.connection.commit()
    cur.close()
    return jsonify({"message": "Patient record deleted successfully"}), 200


@app.route('/edit_nurse/<int:id>', methods=['PUT'])
def edit_nurse(id):
    data = request.json  # Get the JSON data from the request
    name = data['Name']
    age = data['Age']
    gender = data['Gender']

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE nurse
        SET name = %s, age = %s, gender = %s
        WHERE id = %s
    """, (name, age, gender, id))

    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Nurse data updated successfully"}), 200



@app.route('/edit_patient/<int:id>', methods=['PUT'])
def edit_patient(id):
    data = request.json  # Get the JSON data from the request
    name = data['Name']
    age = data['Age']
    gender = data['Gender']
    nurse_id=data["Nurse_id"]

    cur = mysql.connection.cursor()
    cur.execute("""
        UPDATE patient
        SET name = %s, age = %s, gender = %s,nurse_id=%s
        WHERE id = %s
    """, (name, age, gender,nurse_id, id))

    mysql.connection.commit()
    cur.close()

    return jsonify({"message": "Patient data updated successfully"}), 200




if __name__ == "__main__":
    app.run(debug=True)
