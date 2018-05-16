function TypeWriter(speed=10)
{
    this.speed = speed;
    this.ITERATOR = 0;
}

TypeWriter.prototype = {
    constructor: TypeWriter,

    Write: function(element, textToType)
    {
        var textLength = textToType.length;
        var iterator = this.ITERATOR;

        setInterval(function() {
            if(iterator < textLength)
            {
                element.innerHTML += textToType.charAt(iterator);
                iterator++;
            }
        }, this.speed);
    }
}