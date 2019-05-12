from flask import Flask

app = Flask('pepe')
print('Hello fucking world')
open('test', 'w').write('fucking youu')
@app.route('/')
def index():
    return 'Hello fucking world'

app.run()