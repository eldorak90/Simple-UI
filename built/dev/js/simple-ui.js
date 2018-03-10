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
    addChild(child)
    {
        this.element.appendChild(child.element);
    }

    removeChild(child)
    {
        this.element.removeChild(child);
    }
}

class Page extends Container
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("sui-page");
    }
}

class Control extends SuiObject
{
    
}

class Button extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("sui-button");
    }
}

class TextBox extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("input");
        this.addCssClass("sui-textbox");
    }
}