/**
 * Created by wushuyi on 2015/8/3.
 */
import Backbone from 'backbone';

// Todo Model
// ----------
let Todo = Backbone.Model.extend({
    // Default attributes ensure that each todo created has `title` and
    // `completed` keys.
    defaults: {
        title: '',
        completed: false
    },
    // Toggle the `completed` state of this todo item.
    toggle: function () {
        this.save({
            completed: !this.get('completed')
        });
    }
});

export default Todo;