var pastInput = document.getElementById('past-user-input');

// User input
var textInput = document.getElementsByClassName('user-text')[0];
var _textInputExisting = textInput.textContent;
var _textInputFinal = '';

// Command text and prompt wrapper
var command = document.getElementById('command');

// Constants
var CHAR_SPACE = '\u00A0';

function Prompt(user, atWhat, caret)
{
    var promptValue = user + '@' + atWhat + caret;
    var prompt = document.createElement('span');

    prompt.className = 'prompt';
    prompt.innerText = promptValue;

    return prompt;
}

function EvaluateInput(inputToEvaluate)
{
    var response = '';

    /* TODO - switch() is temporary, replace with RegExp() */
    switch(inputToEvaluate)
    {
        case 'nuke':
            response = "Launching nukes...";
            break;

        case 'peace':
            response = "You got it, goody-two-shoes.";
            break;

        case 'git' + CHAR_SPACE + 'init':
            response = "Repo initialised";
            break;

        default:
            response = "Command '"+ inputToEvaluate +"' unknown!";
    }

    return response;
}

function GetUserInput(terminalPrompt)
{
    console.log("Listening for keypress...");

    command.prepend(terminalPrompt);

    // Detect specific non-alphanumeric keys
    document.onkeydown = function(e) {
        e = e.keyCode;

        switch(e)
        {
            // Backspace
            case 8:
                var lastIndex = _textInputExisting.length - 1;
                var lastLetter = _textInputExisting[lastIndex];

                if(lastLetter != undefined) {
                    _textInputExisting = _textInputExisting.slice(0, lastIndex);
                    textInput.textContent = _textInputExisting;

                    console.log("Last letter: " + lastLetter);
                    console.log("Exisintg text after slice(): " + _textInputExisting);   
                }
                break;
            default:
                break;
        }
    }

    // Detect alphanumeric input
    document.onkeypress = function(e)
    {
        e = e.keyCode;
        var char = String.fromCharCode(e);
        console.log(e + ' - ' + char);

        // Cancel specific characters for formatting purposes
        switch(e)
        {
            case 32:
                char = CHAR_SPACE;
                break;
            case 13:
                char = '';
                break;
        }

        textInput.textContent = _textInputExisting + char;
        _textInputExisting = textInput.textContent;

        // Finalise input when ENTER is pressed
        if(e === 13) {
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
    pastInputLine.innerText = terminalPrompt.innerText + CHAR_SPACE + toDisplay;

    pastInput.appendChild(pastInputLine);
}

window.onload = function() {
    var prompt = Prompt("tomek","matrix","$");
    GetUserInput(prompt);
}