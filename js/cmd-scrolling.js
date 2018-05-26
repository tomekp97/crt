var ScrollingComponents = {
    cmd: document.getElementsByClassName('actual-cmd-text'),
    scrollSpeed: 25,
    scrollOffset: 0
}
function MouseWheelHandler(e)
{
    e.preventDefault();
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    ScrollCmd(delta);
}

function DetectLastCommandPastScreenHeight(e)
{
    var cmd = ScrollingComponents.cmd[0];
    var mainScreenHeight = document.getElementsByClassName('text-wrapper')[0].clientHeight;
    var cmdInputHeight = ScrollingComponents.cmd[0].clientHeight;

    var key = e.keyCode;

    if ((cmdInputHeight + 60) > mainScreenHeight) {
        var difference = cmdInputHeight - mainScreenHeight;
        // Account for the prompt/past input and new line.
        difference += 100;
        mainScreenHeight += difference;

        ScrollingComponents.scrollOffset = -difference;

        cmd.setAttribute('style', 'margin-top: '+ -difference +'px;');
    }
}

function ScrollCmd(scrollDelta)
{
    var cmd = ScrollingComponents.cmd[0];
    var scrollSpeed = ScrollingComponents.scrollSpeed;
    var scrollOffset;

    if (scrollDelta == 1)
    {
        if (ScrollingComponents.scrollOffset == 0) {
            ScrollingComponents.scrollOffset = 0;
        } else {
            ScrollingComponents.scrollOffset += scrollSpeed;
        }
    }
    if(scrollDelta == -1) {
        ScrollingComponents.scrollOffset += -scrollSpeed;
    }

    scrollOffset = ScrollingComponents.scrollOffset;
    
    cmd.setAttribute('style', 'margin-top: '+ scrollOffset +'px;');
    
}

document.addEventListener('mousewheel', MouseWheelHandler, false);
document.addEventListener('keydown', DetectLastCommandPastScreenHeight, false);
