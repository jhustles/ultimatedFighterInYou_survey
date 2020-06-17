from flask import Flask, render_template, url_for, request
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
        feature_1 = float(request.form['estimated_minutes'])
        feature_2 = float(request.form['StrikingAttemptsToGrapplingAttempts_Ratio'])
        feature_3 = float(request.form['PercentRank_StrikingtoGrappingAttemps_Ratio'])
        feature_4 = float(request.form['StrikingToGrapplingTime_Ratio'])
        feature_5 = float(request.form['PercentRank_StrikingToGrappingTime_Ratio'])
        data = [[feature_1, feature_2, feature_3, feature_4, feature_5]]
       
        my_prediction = clf.predict(data)
        return render_template('result.html', classification=my_prediction)
if __name__ == '__main__':
    app.run(debug=True)