function Commands()
{
    this.allCommands = JSON.parse(commands_list);
    this.commands = [];
}

Commands.prototype = {
    constructor: Commands,

    CommandsList: function()
    {
        return this.allCommands;
    },

    AvailableCommands: function()
    {
        for(var command in this.allCommands)
        {
            this.commands.push(command);
        }
        return this.commands;
    }
}