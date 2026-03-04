from flask import Flask, render_template, Response

app = Flask(__name__)

@app.route('/')
def index():
    # Serves the main decoy website
    return render_template('index.html')

@app.route('/robots.txt')
def robots():
    # The Vulnerability: Telling search engines NOT to crawl the secret page, 
    # which ironically tells hackers exactly where it is.
    rules = "User-agent: *\nDisallow: /admin-backup-flag-xyz987\n"
    return Response(rules, mimetype="text/plain")

@app.route('/admin-backup-flag-xyz987')
def hidden_flag():
    # The hidden page containing the flag
    return render_template('flag.html')

app = app