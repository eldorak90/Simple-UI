class Button extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("SUI-Button");
    }

    setText(text)
    {
        this.element.innerText = text;
    }

    setIcon(icon)
    {
        this.element.appendChild(icon.element);
    }

    setIconPos(iconPos)
    {
        if (iconPos == ICON_POS.LEFT)
        {

        }
        else if (iconPos == ICON_POS.RIGHT)
        {

        }
    }
    
}

class SuiInput extends Control
{

}

class TextBox extends SuiInput
{
    constructor()
    {
        super();
        this.element = document.createElement("input");
        this.addCssClass("SUI-TextBox");
    }
}

class TextBoxEmail extends TextBox
{
    constructor()
    {
        super();
        this.element.type = "email";
        this.addCssClass("SUI-TextBoxEmail");
    }
}

class TextBoxUrl extends TextBox
{
    constructor()
    {
        super();
        this.element.type = "url";
        this.addCssClass("SUI-TextBoxUrl");
    }
}

class TextBoxTel extends TextBox
{
    constructor()
    {
        super();
        this.element.type = "tel";
        this.addCssClass("SUI-TextBoxTel");
    }
}

class NumberBox extends TextBox
{
    constructor()
    {
        super();
        this.element.type = "number";
        this.addCssClass("SUI-TextBoxNumber");
    }
}

class ColorPicker extends TextBox
{
    constructor()
    {
        super();
        this.element.type = "color";
        this.addCssClass("SUI-ColorPicker");
    }
}

class TextArea extends SuiInput
{
    constructor()
    {
        super();
        this.element = document.createElement("textarea");
        this.addCssClass("SUI-TextArea");
    }
}

class Checkbox extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("input");
        this.element.type = "checkbox";
        this.addCssClass("SUI-CheckBox");
    }
}

class RadioGroup extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("SUI-RadioGroup");
    }

    addRadio(radio)
    {
        radio.element.name = this.name;
        this.element.appendChild(radio.element);
    }

    setName(name)
    {
        this.name = name;
    }
}

class RadioButton extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("input");
        this.element.type = "radio";
        this.addCssClass("SUI-RadioButton");
    }
}

class Icon extends Control
{   
    constructor()
    {
        super();
        this.element = document.createElement("span");
        this.addCssClass("SUI-Icon");
    }

    setIconCode(code)
    {
        this.element.setAttribute("icon", code);
    }

    setFontFamily(font)
    {
        this.element.style.fontFamily = font;
    }
}

class Image extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("img");
        this.addCssClass("SUI-Image");
    }
}

class Text extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("span");
        this.addCssClass("SUI-Text");
    }

    setText(text)
    {
        this.element.innerText = text;
    }
}

class HTML extends Control
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("SUI-Html");
    }

    setHtml(html)
    {
        var temp = document.createElement("template");
        temp.innerHTML = html;
        this.element = temp.content.firstChild();
        this.addCssClass("SUI-Html");
    }
}

