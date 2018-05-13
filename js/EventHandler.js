function EventHandler(){}

EventHandler.prototype = {
    constructor: EventHandler,

    OnKeyPress: function(action, context)
    {
        document.onkeypress = function(e)
        {
            e = e.which;
            action.apply(context);
            action(e);
        }
    }
}