import requests
import unittest
import subprocess
import time
import threading


class TodoTest(unittest.TestCase):
    def setUp(self):
        self.process = subprocess.Popen(["python3", "../../src/rest_api.py"])

        time.sleep(10)

        requests.put('http://localhost:5000/todo/todo1',
                     json={'text': 'Remember the milk', 'completed': 'false'}).json()
        requests.put('http://localhost:5000/todo/todo2',
                     json={'text': 'Remember the milk2', 'completed': 'true'}).json()

    def tearDown(self):
        self.process.kill()

    def test_put(self):
        g = requests.put('http://localhost:5000/todo/todo1',
                         json={'text': 'Remember the milk', 'completed': 'false'}).json()

        self.assertEqual('Remember the milk', g['text'])
        self.assertEqual('false', g['completed'])

    def test_get(self):
        g = requests.get('http://localhost:5000/todo/todo1').json()

        self.assertEqual('Remember the milk', g['text'])
        self.assertEqual('false', g['completed'])

    def test_get_all(self):
        g = requests.get('http://localhost:5000/todo').json()

        self.assertEqual('Remember the milk', g['todo1']['text'])
        self.assertEqual('false', g['todo1']['completed'])

        self.assertEqual('Remember the milk2', g['todo2']['text'])
        self.assertEqual('true', g['todo2']['completed'])

    def test_delete(self):
        g = requests.delete('http://localhost:5000/todo/todo1').json()

        self.assertFalse('todo1' in g)


if __name__ == '__main__':
    unittest.main()
