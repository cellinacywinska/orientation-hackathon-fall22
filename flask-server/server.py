from urllib import request
from flask import Flask, request, jsonify, render_template
from ai import *

app = Flask(__name__)

# Members API route
@app.route("/", methods=['POST'])
def chat():
    if request.method == 'POST':
        process = cleanComment(request.form['message'])
        if process:
            #Search stackoverflow for related posts. F.ex findPost(process)
            return jsonify(message=process)
        else:
            return jsonify(message="Sorry, we couldn't find anything")
    else:
        return "error"

if __name__ == '__main__':
    app.run(debug=True)