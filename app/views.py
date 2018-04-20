from flask import render_template,jsonify,request
from app import app

@app.route('/')
def index():
    return 'welcome!'
@app.route('/load')
def load():
    user = { 'nickname': 'Miguel' } # fake user
    posts = [ # fake array of posts
        {
            'author': { 'nickname': 'John' },
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': { 'nickname': 'Susan' },
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template("localindex.html",
        title = 'Home',
        user = user,
        posts = posts)
@app.route('/upload/',methods=['POST'])
def start_parse():
    if request.method == 'POST': 
        filename = 'initial'       
        f = request.files['myFileUpload']
        filename = f.filename
        minetype = f.content_type
        f.save('./'+filename)
    return filename

@app.route('/result',methods=['GET'])
def get_xml():
    xml = [{
            'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },{
            'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
    ]
    return jsonify({'xmls':xml}),200