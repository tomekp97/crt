function Terminal(shellUser)
{
    this.shellUser = shellUser;
    this.Prompt = new Prompt(this.shellUser, 'matrix', '$');
    this.TypeWriter = new TypeWriter();
    this.EvaluateInput = new EvaluateInput();
    this.GetUserInput = new GetUserInput(this.Prompt, this.TypeWriter, this.EvaluateInput);

    this.GetUserInput.DetectNonAlphanumericKeys();
    this.GetUserInput.DetectAlphanumericKeys();
    this.GetUserInput.Initialise();
}

Terminal.prototype = {
    constructor: Terminal,

    Message: function(textOutputElementID, message)
    {
        textOutput = document.getElementById(textOutputElementID);
        this.TypeWriter.Write(textOutput, message);
    }
}