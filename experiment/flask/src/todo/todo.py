from flask import Flask, request, jsonify
from flask_restful import Resource
import datetime

todos = {}


class Todo(Resource):
    def get(self, todo_id) -> str:
        print("GET", todo_id)
        return jsonify(todos[todo_id])

    def delete(self, todo_id) -> str:
        print("DELETE", todo_id)
        del todos[todo_id]
        return jsonify(todos)

    def post(self, todo_id) -> str:
        todo = TodoItem(
            todo_id, request.json['text'], request.json['completed'])
        print("POST:", todos[todo_id])
        return jsonify(todos[todo_id])

    def put(self, todo_id) -> str:
        todos[todo_id] = TodoItem(
            todo_id, request.json['text'], request.json['completed'])
        return jsonify(todos[todo_id])


class TodoList(Resource):
    def get(self) -> str:
        print("GET ALL")
        return jsonify(todos)


class TodoItem:
    def __init__(self, id: str, text: str, completed: str):
        self.id = id
        self.text = text
        self.completed = completed
        self.data_created = datetime.datetime.today()
        self.date_modified = datetime.datetime.today()

    def get_id(self) -> str:
        return self.id

    def get_data(self) -> str:
        return self.data

    def get_done(self) -> str:
        return self.done

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'completed': self.completed,
            'dateCreate': str(self.data_created),
            'dateModified': str(self.date_modified)
        }
