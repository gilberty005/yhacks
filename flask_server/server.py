from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/members/*": {"origins": "http://localhost:3000"}})

@app.route("/members", methods=['GET', 'POST'])
def members():
    if request.method == 'POST':
        data = request.json
        print(data)
        return {"status": "success", "data": data}, 200
    else:
        return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(debug=True)
