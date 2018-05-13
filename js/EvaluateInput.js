function EvaluateInput()
{
    this.RESPONSE = '';
    this.CHAR_SPACE = '\u00A0';
}

EvaluateInput.prototype = {
    constructor: EvaluateInput,

    InputCheck: function(inputToEvaluate)
    {
        /* TODO - switch() is temporary, replace with RegExp() */
        switch(inputToEvaluate)
        {
            case 'nuke':
                this.RESPONSE = "Launching nukes...";
                break;
        
            case 'peace':
                this.RESPONSE = "You got it, goody-two-shoes.";
                break;
        
            case 'git' + this.CHAR_SPACE + 'init':
                this.RESPONSE = "Repo initialised";
                break;
        
            case '':
                this.RESPONSE = "";
                break;
        
            default:
                this.RESPONSE = "Command '"+ inputToEvaluate +"' unknown!";
        }
        return this.RESPONSE;
    }

}