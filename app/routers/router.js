/**
 * Created by wushuyi on 2015/8/3.
 */
import Backbone from 'backbone';
import Todos from '../conllections/todo';
import global from '../env/global';

// Todo Router
// ----------
let Workspace = Backbone.Router.extend({
    routes:{
        '*filter': 'setFilter'
    },
    setFilter: function( param ) {
    // Set the current filter to be used
    // Trigger a collection filter event, causing hiding/unhiding
    // of Todo view items
        global.TodoFilter = param || '';
        Todos.trigger('filter');
    }
});
let TodoRouter = new Workspace();
Backbone.history.start();

export default TodoRouter;