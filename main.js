// Constants
var CHAR_SPACE = '\u00A0';

var welcomeMessage_Line1 = "TP terminal version 1.0 (2018)";

var pastInput = document.getElementById('past-user-input');

// User input
var textInput = document.getElementsByClassName('user-text')[0];
var _textInputExisting = textInput.textContent;
var _textInputFinal = '';

// Command text and prompt wrapper
var command = document.getElementById('command');

// Hisotry inputs array
data = {
    history: [],
    currentIndex: 0
}
var traverse = data.history.length;

function AmendTerminalInputValues(textInput_Value)
{
    textInput.textContent = textInput_Value;
    _textInputExisting = textInput.textContent;
}

function Prompt(user, atWhat, caret)
{
    var promptValue = user + '@' + atWhat + caret;
    var prompt = document.createElement('span');

    prompt.className = 'prompt';
    prompt.innerText = promptValue;

    return prompt;
}

function AddToHistory(pastCommand)
{
    data.history.push(pastCommand);
    traverse = data.history.length;
}

function CycleThroughHistory(direction)
{
    var totalHistoryCommands = data.history.length;

    if(direction === 'up')
    {
        traverse += -1;
    } else {
        traverse += 1;
    }

    if(traverse > totalHistoryCommands - 1)
    {
        traverse = totalHistoryCommands - 1;
    } else if(traverse < 0) {
        traverse = 0;
    }

    var pastCommand = data.history[traverse];
    return pastCommand;
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

        case '':
            response = "";
            break;

        default:
            response = "Command '"+ inputToEvaluate +"' unknown!";
    }

    return response;
}

function GetUserInput(terminalPrompt)
{

    command.prepend(terminalPrompt);

    // Detect specific non-alphanumeric keys
    document.onkeydown = function(e) {
        e = e.which;

        switch(e)
        {
            // Backspace
            case 8:
                var lastIndex = _textInputExisting.length - 1;
                var lastLetter = _textInputExisting[lastIndex];

                if(lastLetter != undefined) {
                    _textInputExisting = _textInputExisting.slice(0, lastIndex);
                    textInput.textContent = _textInputExisting;
                }
                if (_textInputExisting.length == 0) {
                    traverse = data.history.length;   
                }
                break;
            // Up arrow
            case 38:
                pastCommand = CycleThroughHistory('up')
                AmendTerminalInputValues(pastCommand);
                break;
            case 40:
                pastCommand = CycleThroughHistory('down')
                AmendTerminalInputValues(pastCommand);
                break;
            default:
                break;
        }
    }

    // Detect alphanumeric input
    document.onkeypress = function(e)
    {
        e = e.which;
        var char = String.fromCharCode(e);

        // Cancel specific characters for formatting purposes
        switch(e)
        {
            case 32:
                char = CHAR_SPACE;
                break;
            case 13:
            case 0:
                char = '';
                break;
        }
        AmendTerminalInputValues(_textInputExisting + char);

        // Finalise input when ENTER is pressed
        if(e === 13) {
            _textInputFinal = _textInputExisting;

            textInput.textContent = '';
            _textInputExisting = '';

            DisplayPastInput(_textInputFinal, terminalPrompt);

            AddToHistory(_textInputFinal);
            return _textInputFinal;
        }
    }
}

function TypeWriter(element, textToType, speed=20)
{
    var iterator = 0;
    var textLength = textToType.length;

    setInterval(function() {
        if(iterator < textLength)
        {
            element.innerHTML += textToType.charAt(iterator);
            iterator++;
        }
    }, speed);
}

function DisplayPastInput(toDisplay, terminalPrompt)
{
    var pastInputLine = document.createElement('span');
    var evaluatedInputLine = document.createElement('span');
    var _evaluatedInput = EvaluateInput(toDisplay);

    pastInputLine.className = 'past-line';
    pastInputLine.innerText = terminalPrompt.innerText + CHAR_SPACE + toDisplay;

    evaluatedInputLine.className = 'evaluated-line past-line';
    evaluatedInputLine.innerText = _evaluatedInput;

    pastInput.appendChild(pastInputLine);
    pastInput.appendChild(evaluatedInputLine);

    TypeWriter(evaluatedInputLine, _evaluatedInput);
}

window.onload = function() {
    var prompt = Prompt("tomek","matrix","$");
    GetUserInput(prompt);
    var wlecomeMessageBlock = document.getElementById('welcome-message');
    
    TypeWriter(wlecomeMessageBlock, welcomeMessage_Line1);
    setTimeout(function() {
        GetUserInput(prompt);
    }, 1000);
}