from flask import render_template,jsonify,request,send_from_directory
from app import app,xdpXMLParser
import os.path

root_dir = os.path.dirname(os.getcwd())
dirpath = os.path.join(app.root_path, 'download')
@app.route('/')
def index():
    return render_template("localindex.html",
        title = 'Home')

@app.route('/upload/',methods=['POST'])
def start_upload():
    if request.method == 'POST': 
        filename = 'initial'       
        f = request.files['myFileUpload']
        filename = f.filename
        minetype = f.content_type
        f.save('./tmp/'+filename)
    return filename,201

@app.route('/parse',methods=['GET'])
def start_parse():
    xdpXMLParser.transfer()
    return 'parse success!',201

@app.route('/download',methods=['GET'])
def download():
    #return dirpath
    return send_from_directory(directory=dirpath, 
        filename='IDCN_BSAIS_xfa2.XML',
        as_attachment=True),200

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