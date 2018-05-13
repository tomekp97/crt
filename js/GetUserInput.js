
function GetUserInput(terminalPrompt_OBJECT, typeWriter_OBJECT, evaluateInput_OBJECT)
{
    this.terminalPrompt = terminalPrompt_OBJECT;
    this.typeWriter = typeWriter_OBJECT;
    this.evaluateInput = evaluateInput_OBJECT;

    // Constants
    this.SELF = this;
    this.CHAR_SPACE = '\u00A0';
    this.PAST_INPUT = document.getElementById('past-user-input');
    this.TEXT_INPUT = document.getElementsByClassName('user-text')[0];
    this._TEXT_INPUT_EXISTING = this.TEXT_INPUT.textContent;
    this._TEXT_INPUT_FINAL = '';
    this.COMMAND = document.getElementById('command');
    this.DATA = {
        history: [],
        currentIndex: 0
    }
    var TRAVERSE = this.DATA.history.length;
}

GetUserInput.prototype = {
    constructor: GetUserInput,

    Initialise: function()
    {
        this.PrependPrompt();
    },

    PrependPrompt: function()
    {
        this.COMMAND.prepend(this.terminalPrompt);
    },

    AmendTerminalInputValues: function(textInput_Value)
    {
        this.TEXT_INPUT.textContent = textInput_Value;
        this._TEXT_INPUT_EXISTING = this.TEXT_INPUT.textContent;
    },
    
    // Detect specific non-alphanumeric keys
    DetectNonAlphanumericKeys: function()
    {
        var GUInput = this;

        document.onkeydown = function(e) {
            key = e.which;
    
            switch(key)
            {
                // Backspace
                case 8:
                    var lastIndex = GUInput._TEXT_INPUT_EXISTING.length - 1;
                    var lastLetter = GUInput._TEXT_INPUT_EXISTING[lastIndex];
    
                    if(lastLetter != undefined) {
                        GUInput._TEXT_INPUT_EXISTING = GUInput._TEXT_INPUT_EXISTING.slice(0, lastIndex);
                        GUInput.TEXT_INPUT.textContent = GUInput._TEXT_INPUT_EXISTING;
                    }
                    if (GUInput._TEXT_INPUT_EXISTING.length == 0) {
                        GUInput.TRAVERSE = GUInput.DATA.history.length;   
                    }
                    break;
                // Up arrow
                case 38:
                    pastCommand = GUInput.CycleThroughHistory('up')
                    GUInput.AmendTerminalInputValues(pastCommand);
                    break;
                case 40:
                    pastCommand = GUInput.CycleThroughHistory('down')
                    GUInput.AmendTerminalInputValues(pastCommand);
                    break;
                default:
                    break;
            }
        }
    },

    // Detect alphanumeric input
    DetectAlphanumericKeys: function(key, context)
    {
        var GUInput = this;
        var char = String.fromCharCode(key);

        document.onkeypress = function(e)
        {
            var key = e.which;
            var char = String.fromCharCode(key);
    
            // Cancel specific characters for formatting purposes
            switch(key)
            {
                case 32:
                    char = GUInput.CHAR_SPACE;
                    break;
                case 13:
                case 0:
                    char = '';
                    break;
            }
            GUInput.AmendTerminalInputValues(GUInput._TEXT_INPUT_EXISTING + char);
    
            // Finalise input when ENTER is pressed
            if(key === 13) {
                GUInput._TEXT_INPUT_FINAL = GUInput._TEXT_INPUT_EXISTING;
    
                GUInput.TEXT_INPUT.textContent = '';
                GUInput._TEXT_INPUT_EXISTING = '';
    
                GUInput.DisplayPastInput(GUInput._TEXT_INPUT_FINAL, GUInput.terminalPrompt, GUInput.typeWriter);
    
                GUInput.AddToHistory(GUInput._TEXT_INPUT_FINAL);
                return GUInput._TEXT_INPUT_FINAL;
            }
        }
    },

    AddToHistory: function(pastCommand)
    {
        this.DATA.history.push(pastCommand);
        this.TRAVERSE = this.DATA.history.length;
    },

    CycleThroughHistory: function(direction)
    {
        var totalHistoryCommands = this.DATA.history.length;
    
        if(direction === 'up')
        {
            this.TRAVERSE += -1;
        } else {
            this.TRAVERSE += 1;
        }
    
        if(this.TRAVERSE > totalHistoryCommands - 1)
        {
            this.TRAVERSE = totalHistoryCommands - 1;
        }
        else if(this.TRAVERSE < 0){
            this.TRAVERSE = 0;
        }
    
        var pastCommand = this.DATA.history[this.TRAVERSE];
        return pastCommand;
    },

    DisplayPastInput: function(toDisplay, terminalPrompt, typeWriter)
    {
        var pastInputLine = document.createElement('span');
        var evaluatedInputLine = document.createElement('span');
        var _evaluatedInput = this.evaluateInput.InputCheck(toDisplay);

        pastInputLine.className = 'past-line';
        pastInputLine.innerHTML = terminalPrompt.innerHTML + this.CHAR_SPACE + toDisplay;

        evaluatedInputLine.className = 'evaluated-line past-line';

        this.PAST_INPUT.appendChild(pastInputLine);
        this.PAST_INPUT.appendChild(evaluatedInputLine);

        typeWriter.Write(evaluatedInputLine, _evaluatedInput);
    }
}