function GetCookie(name)
{
    var value = "; " + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2)
    {
        return parts.pop().split(';').shift();
    }
}

function TerminalSetup(shellUser)
{
    var TerminalShell = new Terminal(shellUser);
    var message = "(c) TP shell [ver1.1] - (2018) \n\
    ------------------------------\n\
    Type 'cmds' to view a list of custom commands.";
    TerminalShell.Message('welcome-message', message);
}

function ScreenSwap(shellUser)
{
    var Typer = new TypeWriter(60);
    var _login = {
        screen: document.getElementById('login-screen'),
        passwordWrapper: document.getElementById('password-type'),
        passwordOutput: document.getElementById('simulated-password')
    }
    var _loading = {
        screen: document.getElementById('loading-screen'),
        loadBar: document.getElementById('load-bar')
    }
    var _terminal = {
        screen: document.getElementById('terminal-screen')
    }

    _login.passwordWrapper.removeAttribute('hidden');

    setTimeout(function()
    {
       Typer.Write(_login.passwordOutput, "**********");

       setTimeout(function()
        {
            _login.screen.setAttribute('hidden', 'hidden');
            _loading.screen.removeAttribute('hidden');
            
            Typer.Write(_loading.loadBar, "####################################################################################################");
            
            setTimeout(function()
            {
                _loading.screen.setAttribute('hidden', 'hidden');
                _terminal.screen.removeAttribute('hidden');
                TerminalSetup(shellUser);
            }, 1000)
        }, 1000)
    }, 1000);    
}

function Setup()
{
    var form = document.getElementById('username-form');
    var username = document.getElementById('username');
    var submit = document.getElementById('username-submit');
    
    form.onsubmit = function(e)
    {
        e.preventDefault();
        form.removeChild(submit);
        document.cookie = "tpshellusername=" + username.value;
        ScreenSwap(username.value);
    }
}