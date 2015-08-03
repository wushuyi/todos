/**
 * Created by wushuyi on 2015/8/3.
 */
import Backbone from 'backbone';
import Backbone_LocalStorage from 'backbone.localStorage';
import Todo from '../models/todo';

// Todo Collection
// ----------
// The collection of todos is backed by *localStorage* instead of a remote
// server.
let TodoList = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Todo,
    // Save all of the todo items under the `"todos-backbone"` namespace.
    // Note that you will need to have the Backbone localStorage plug-in
    // loaded inside your page in order for this to work. If testing
    // in the console without this present, comment out the next line
    // to avoid running into an exception.
    localStorage: new Backbone_LocalStorage('todos-backbone'),
    // Filter down the list of all todo items that are finished.
    completed: function () {
        return this.filter(function (todo) {
            return todo.get('completed');
        });
    },
    // Filter down the list to only todo items that are still not finished.
    remaining: function () {
    // apply allowsus to define the context of this within our function scope
        return this.without.apply(this, this.completed());
    },
    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function () {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },
    // Todos are sorted by their original insertion order.
    comparator: function (todo) {
        return todo.get('order');
    }
});

let Todos = new TodoList();

export default Todos;