var pastInput = document.getElementById('past-user-input');

// User input
var textInput = document.getElementsByClassName('user-text')[0];
var _textInputExisting = textInput.textContent;
var _textInputFinal = '';

// Command text and prompt wrapper
var command = document.getElementById('command');

function Prompt(user, atWhat, caret)
{
    var promptValue = user + '@' + atWhat + caret;
    var prompt = document.createElement('span');

    prompt.className = 'prompt';
    prompt.innerText = promptValue;

    return prompt;
}

function GetUserInput(terminalPrompt)
{
    console.log("Listening for keypress...");

    command.prepend(terminalPrompt);

    document.onkeypress = function(e)
    {
        e = e.keyCode;
        var char = String.fromCharCode(e);
        console.log(e + ' - ' + char);

        textInput.textContent = _textInputExisting + char;
        _textInputExisting = textInput.textContent;

        // If keypress is Enter
        if (e === 13) {
            _textInputFinal = _textInputExisting;

            textInput.textContent = '';
            _textInputExisting = '';

            console.log("User input: " + _textInputFinal);

            DisplayPastInput(_textInputFinal, terminalPrompt);

            return _textInputFinal;
        }
    }
}

function DisplayPastInput(toDisplay, terminalPrompt)
{
    var pastInputLine = document.createElement('span');
    pastInputLine.className = 'past-line';
    pastInputLine.innerText = terminalPrompt.innerText + toDisplay;

    pastInput.appendChild(pastInputLine);
}

window.onload = function() {
    var prompt = Prompt("tomek","matrix","$");
    GetUserInput(prompt);
}