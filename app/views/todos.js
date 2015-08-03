/**
 * Created by wushuyi on 2015/8/3.
 */
import Backbone from 'backbone';
import global from '../env/global';
import tpl_item from '../tpl/item.tpl!txt';

// Todo Item View
// --------------
// The DOM element for a todo item...
let TodoView = Backbone.View.extend({
    //... is a list tag.
    tagName: 'li',
    // Cache the template function for a single item.
    template: _.template(tpl_item),
    // The DOM events specific to an item.
    events: {
        'click .toggle': 'togglecompleted',
        'dblclick label': 'edit',
        'click .destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },
    // The TodoView listens for changes to its model, rerendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },
    // Rerenders the titles of the todo item.
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass( 'completed', this.model.get('completed') );
        this.toggleVisible();
        this.$input = this.$('.edit');
        return this;
    },
    //  Toggles visibility of item
    toggleVisible : function () {
        this.$el.toggleClass( 'hidden', this.isHidden());
    },
    //  Determines if item should be hidden
    isHidden : function () {
        let isCompleted = this.model.get('completed');
        return ( // hidden cases only
            (!isCompleted && global.TodoFilter === 'completed')
            || (isCompleted && global.TodoFilter === 'active')
        );
    },
    // Toggle the `"completed"` state of the model.
    togglecompleted: function() {
        this.model.toggle();
    },
    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function () {
        this.$el.addClass('editing');
        this.$input.focus();
    },
    // Close the `"editing"` mode, saving changes to the todo.
    close: function () {
        let value = this.$input.val().trim();
        if (value) {
            this.model.save({title: value});
        }
        this.$el.removeClass('editing');
    },
    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function (e) {
        if (e.which === global.ENTER_KEY) {
            this.close();
        }
    },
    //  Remove the item, destroy the model from
    // *localStorage* and delete its view.
    clear: function() {
        this.model.destroy();
    }
});

export default TodoView;