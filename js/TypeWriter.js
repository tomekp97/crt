function TypeWriter(speed=10)
{
    this.speed = speed;
    this.ITERATOR = 0;
}

TypeWriter.prototype = {
    constructor: TypeWriter,

    Write: function(element, textToType)
    {
        var wrapper = document.createElement('span');
        var textLength = textToType.length;
        var iterator = this.ITERATOR;

        wrapper.className = 'printed-line';
        element.append(wrapper);

        setInterval(function() {
            if(iterator < textLength)
            {
                var letter = document.createElement('span');
                letter.className = 'letter';
                letter.innerHTML = textToType.charAt(iterator);

                wrapper.append(letter);
                iterator++;
            }
        }, this.speed);
    }
}