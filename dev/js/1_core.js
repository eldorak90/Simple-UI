class SuiObject
{

    addCssClass(cssClass)
    {
        this.element.classList.add(cssClass);
    }

    removeCSSClass(cssClass)
    {
        this.element.classList.remove(cssClass);
    }

    setCSSValue(property, value)
    {
        $(this.element).css(property, value);
    }
}

class Core extends SuiObject
{
    constructor()
    {
        super();
        this.element = document.getElementsByTagName("BODY")[0];
        this.pages = [];
    }

    showPage(page)
    {
        this.element.appendChild(page.element);
    }

    goBack()
    {
        this.element.removeChild(this.element.lastChild);
    }
}

class Container extends SuiObject
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
    }

    addChild(child)
    {
        this.element.appendChild(child.element);
    }

    removeChild(child)
    {
        this.element.removeChild(child);
    }
}


class Control extends SuiObject
{
    
}

class Spacer extends SuiObject
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("SUI-Spacer");
    }
}

