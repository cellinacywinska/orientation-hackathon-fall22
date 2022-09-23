from urllib import request
from flask import Flask, request, jsonify, render_template
from ai import *
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})



# Members API route
@app.route("/", methods=['POST'])
@cross_origin()
def chat():
    if request.method == 'POST':
        print(request.json['message'])
        process = cleanComment(request.json['message'])
        if process:
            #Search stackoverflow for related posts. F.ex findPost(process)
            response = jsonify(message=process)
            return response
        else:
            response = jsonify(message="Sorry, please rephrase your question")
            return response
    else:
        return "error"

if __name__ == '__main__':
    app.run(debug=True)