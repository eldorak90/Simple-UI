var ICON_POS = Object.freeze({
    LEFT : 0,
    RIGHT : 1
});

this.counter = 0;

function getNewId()
{
	return "SUI_" + this.counter++;
}

class SimpleArray
{
    constructor()
    {
        this.array = [];
    }

    push(value)
    {
        this.array.push(value);
    }

    get(index)
    {
        return this.array[index];
    }

    remove(value)
    {
        this.array = removeFromArray(this.array, value);
    }

    length()
    {
        return this.array.length;
    }

    clear()
    {
        this.array = [];
    }

    execute(ev)
    {
        this.array.forEach(f => {
            f(ev);
        });
    }

    toArray()
    {
        return this.array;
    }

    clone()
    {
        let arr = new SimpleArray();
        arr.array = this.array;
        return arr;
    }
}

function removeFromArray(array, value)
{
    return array.filter(item => item !== value);
}

