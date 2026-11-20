from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "College Placement Prediction Backend is Running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    cgpa = float(data.get('cgpa', 0))

    if cgpa >= 7.0:
        result = "High Placement Chance"
    elif cgpa >= 5.0:
        result = "Medium Placement Chance"
    else:
        result = "Low Placement Chance"

    return jsonify({
        "placement_prediction": result,
        "cgpa": cgpa
    })

if __name__ == '__main__':
    app.run(debug=True)
