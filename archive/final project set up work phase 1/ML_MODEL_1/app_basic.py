from flask import Flask, render_template, url_for, request
import numpy as np
import pandas as pd
import pickle
# JG Added: "from sklearn import tree"
from sklearn import tree
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=["GET", "POST"])
def predict():
    df= pd.read_csv("./data/figther_sg_attempts_ratio.csv", encoding="UTF-8")
#     df.drop(['Name'], axis=1, inplace=True)
    # Features and Labels
    df['label'] = df['class'].map({'Striker': 0, 'Hybrid Striker': 1, 'Hybrid Grappler': 2, 'Grappler': 3})
    X = df['striking_to_grappling_attempts_ratio']
    y = df['label']
    

    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

    clf = tree.DecisionTreeClassifier()
#     X = clf.fit(X) # Fit the Data

    clf = clf.fit(X_train, y_train)
    clf.score(X_test,y_test)
    print(clf)
    print(f"Training Data Score: {clf.score(X_train, y_train)}")
    print(f"Testing Data Score: {clf.score(X_test, y_test)}")
    
    if request.method == 'POST':
        sga_ratio = request.form['striking_to_grappling_attempts_ratio']
        data = [sga_ratio]
        # vect = clf.transform(data).toarray()
        my_prediction = clf.predict(data)
        return render_template('result.html', prediction=my_prediction)
if __name__ == '__main__':
    app.run(debug=True)