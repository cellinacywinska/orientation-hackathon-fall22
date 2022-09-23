from urllib import request
from flask import Flask, request, jsonify, render_template
from ai import *
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)



# Members API route
@app.route("/", methods=['POST'])
def chat():
    if request.method == 'POST':
        process = cleanComment(request.json["message"])
        if process:
            #Search stackoverflow for related posts. F.ex findPost(process)
            response = jsonify(message=process)
            return response
        else:
            response = jsonify(message="Sorry, we couldn't find anything")
            return response
    else:
        return "error"

if __name__ == '__main__':
    app.run(debug=True)