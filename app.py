from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Model
class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content
        }

# Create tables
with app.app_context():
    db.create_all()

# Routes
@app.route("/")
def home():
    return jsonify({"message": "Welcome to the blogs page!"})

@app.route("/blogs", methods=["GET"])
def read():
    blogs = Blog.query.all()
    return jsonify([blog.to_dict() for blog in blogs])

@app.route("/blogs/<int:id>", methods=["GET"])
def readone(id):
    blog = Blog.query.get(id)
    if blog:
        return jsonify(blog.to_dict())
    return jsonify({"error": "Blog not found!"}), 404

@app.route("/blogs", methods=["POST"])
def create():
    data = request.get_json()

    new_blog = Blog(
        title=data["title"],
        content=data["content"]
    )

    db.session.add(new_blog)
    db.session.commit()

    return jsonify(new_blog.to_dict()), 201

@app.route("/blogs/<int:id>", methods=["DELETE"])
def delete(id):
    blog = Blog.query.get(id)
    if blog:
        db.session.delete(blog)
        db.session.commit()

        return jsonify({"message": "Blog deleted"})


@app.route("/blogs/<int:id>", methods=["PUT"])
def update(id):
    data = request.get_json()  # get JSON data from request
    blog = Blog.query.get(id)  # find blog by id

    if blog:
        blog.title = data.get("title", blog.title)     # update title if provided
        blog.content = data.get("content", blog.content)  # update content if provided

        db.session.commit()  # save changes
        return jsonify(blog.to_dict()), 200

    return jsonify({"error": "Blog not found!"}), 404




if __name__ == "__main__":
    app.run(debug=True)
