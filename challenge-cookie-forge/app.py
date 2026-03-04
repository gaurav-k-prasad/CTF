from flask import Flask, render_template, session

app = Flask(__name__)

# The Vulnerability: A weak, easily guessable or leaked secret key.
# In a real app, this should be a random, hidden environment variable.
app.secret_key = "super_secret_dev_key"


@app.route("/")
def index():
    # Set default role if not present
    if "role" not in session:
        session["role"] = "guest"

    # Check if the player has successfully forged the admin cookie
    if session.get("role") == "admin":
        flag = "TWH{f0rg3d_th3_s1gn4tur3_l1k3_a_pr0}"
        return render_template("index.html", role=session["role"], flag=flag)

    return render_template("index.html", role=session["role"], flag=None)


@app.after_request
def add_header(response):
    response.headers["X-Developer-Key"] = "super_secret_dev_key"
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
