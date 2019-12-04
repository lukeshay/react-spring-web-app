import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/toDo/actionTypes";

const CHANGE_EVENT = "change";
let _toDos = [];

class ToDoStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getToDos() {
        return _toDos;
    }

    getToDoBySlug(slug) {
        return _toDos.find(toDo => toDo.slug === slug);
    }
}

const store = new ToDoStore();

Dispatcher.register(action => {
    switch (action.actionType) {
        case actionTypes.DELETE_TODO:
            _toDos = _toDos.filter(toDo => toDo.id !== action.id);
            store.emitChange();
            break;

        case actionTypes.CREATE_TODO:
            _toDos.push(action.toDo);
            store.emitChange();
            break;

        case actionTypes.UPDATE_TODO:
            _toDos = _toDos.map(toDo =>
                toDo.id === action.toDo.id ? action.toDo : toDo
            );
            store.emitChange();
            break;

        case actionTypes.LOAD_TODOS:
            _toDos = action.toDos;
            store.emitChange();
            break;

        default:
        // nothing to do here
    }
});

export default store;
