from flask import Flask, render_template, url_for, request
import pandas as pd
import pickle
# JG Added: "from sklearn import tree"
from sklearn import tree
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=["GET", "POST"])
def predict():
    df= pd.read_csv("./data/figther_sg_attempts_time_ratio.csv", encoding="UTF-8")
    df.drop(['Name'], axis=1, inplace=True)
    # Features and Labels
    df['label'] = df['class'].map({'Striker': 0, 'Hybrid Striker': 1, 'Hybrid Grappler': 2, 'Grappler': 3})
    feature_one = df['striking_to_grappling_attempts_ratio']
    feature_two = df['striking_to_grappling_time_ratio']
    feature_list = [feature_one, feature_two]

    X = feature_list
    y = df['label']
    
    # Extract Feature With CountVectorizer
    cv = CountVectorizer()
    X = cv.fit_transform(X) # Fit the Data
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
   

    NB_fighterClass_model = open('./model/NB_fighterClass_model.pkl','rb')
    clf = joblib.load(NB_fighterClass_model)
    
    if request.method == 'POST':
        message = request.form['message']
        data = [message]
        vect = cv.transform(data).toarray()
        my_prediction = clf.predict(vect)
        return render_template('result.html', prediction=my_prediction)
if __name__ == '__main__':
    app.run(debug=True)