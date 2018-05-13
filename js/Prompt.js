function Prompt(user, atWhat, caret)
{
    this.user = user;
    this.atWhat = atWhat;
    this.caret = caret;
    this.promptValue = this.user + '@' + this.atWhat + this.caret;
    this.prompt = document.createElement('span');

    this.prompt.className = 'prompt';
    this.prompt.innerHTML = this.promptValue;

    return this.prompt;
}

Prompt.prototype = {
    constructor: Prompt
}