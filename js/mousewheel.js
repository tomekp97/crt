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
