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
    // console.log(ScrollingComponents.cmd);
    // console.log(cmdTop);
    var scrollSpeed = ScrollingComponents.scrollSpeed;
    var scrollOffset;

    if (scrollDelta == 1)
    {
        console.log(ScrollingComponents.scrollOffset);
        if (ScrollingComponents.scrollOffset == 0) {
            ScrollingComponents.scrollOffset = 0;
        } else {
            ScrollingComponents.scrollOffset += scrollSpeed;
        }
        console.log("mouse wheel UP");
    }
    if(scrollDelta == -1) {
        console.log(ScrollingComponents.scrollOffset);
        ScrollingComponents.scrollOffset += -scrollSpeed;
        console.log("mouse wheel DOWN");
    }

    scrollOffset = ScrollingComponents.scrollOffset;
    
    cmd.setAttribute('style', 'margin-top: '+ scrollOffset +'px;');
    
}

document.addEventListener('mousewheel', MouseWheelHandler, false);
