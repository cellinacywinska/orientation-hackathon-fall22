from urllib import request
from flask import Flask, request, jsonify, render_template
from ai import *

app = Flask(__name__)

# Members API route
@app.route("/", methods=['POST'])
def chat():
    if request.method == 'POST':
        process = cleanComment(request.form.get('nm'))
        print(process)

if __name__ == '__main__':
    app.run(debug=True)