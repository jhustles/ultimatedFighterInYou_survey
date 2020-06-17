from flask import Flask, render_template, url_for, request, redirect, jsonify
import pandas as pd
import pickle 
from sklearn.externals import joblib

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=["GET", "POST"])
def predict():
    
    ufc_model = open('./data/ufc.pkl','rb')
    clf = joblib.load(ufc_model)
    
    if request.method == 'POST':
        print("Post Data")
        print(request.json['estimated_minutes'][0])
        feature_1 = float(request.json['estimated_minutes'][0])
        feature_2 = float(request.json['StrikingAttemptsToGrapplingAttempts_Ratio'][0])
        feature_3 = float(request.json['PercentRank_StrikingtoGrappingAttemps_Ratio'][0])
        feature_4 = float(request.json['StrikingToGrapplingTime_Ratio'][0])
        feature_5 = float(request.json['PercentRank_StrikingToGrappingTime_Ratio'][0])
        data = [[feature_1, feature_2, feature_3, feature_4, feature_5]]
       
        my_prediction = clf.predict(data)
        print(my_prediction)
        return jsonify({ "data": my_prediction[0]})
        #return render_template('result.html', classification=my_prediction)
     
    return render_template('result.html')
if __name__ == '__main__':
    app.run(debug=True)