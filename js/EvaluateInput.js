function EvaluateInput()
{
    this.CommandsObject = new Commands()
    this.RESPONSE = '';
    this.CHAR_SPACE = '\u00A0';
    this.COMMANDS_LIST = this.CommandsObject.CommandsList();
    this.AVAILABLE_COMMANDS = this.CommandsObject.AvailableCommands();
}

EvaluateInput.prototype = {
    constructor: EvaluateInput,

    InputCheck: function(inputToEvaluate)
    {
        if (this.AVAILABLE_COMMANDS.indexOf(inputToEvaluate) != -1)
        {
            var result = this.COMMANDS_LIST[inputToEvaluate].output;
            this.RESPONSE = result;
        }
        else if(inputToEvaluate == '')
        {
            this.RESPONSE = '';
        } else {
            this.RESPONSE = "Command '"+ inputToEvaluate +"' unknown!";
        }

        return this.RESPONSE;
    }

}