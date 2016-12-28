from flask import Flask, render_template
from flask_assets import Environment, Bundle

app = Flask(__name__)
assets = Environment(app)

scss = Bundle('styles/main.css', output='styles/main.css')
js = Bundle('scripts/main.js', output='scripts/main.js')

assets.register('scss_main', scss)
assets.register('js_main', js)


@app.route("/book")
def template_test():
    return render_template('book.html')

@app.route("/")
def sayHi():
    return "Hello world, this is the home page! <br /> Visit /book to see the book page!"


if __name__ == '__main__':
    app.run(debug=True)
