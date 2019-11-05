from flask import Flask
from flask_restful import Api
from todo.todo import Todo, TodoList, TodoItem
from flask.json import JSONEncoder


class MyJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, TodoItem):
            return obj.serialize()

        return super(MyJSONEncoder, self).default(obj)


app = Flask(__name__)
api = Api(app)

app.json_encoder = MyJSONEncoder
api.add_resource(Todo, '/todo/<string:todo_id>')
api.add_resource(TodoList, '/todo')


if __name__ == '__main__':
    app.run(debug=True)
