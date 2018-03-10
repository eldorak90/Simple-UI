var ICON_POS = Object.freeze({
    LEFT : 0,
    RIGHT : 1
});
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



class Page extends Container
{
    constructor()
    {
        super();
        this.headers = new VFlexContainer();
        this.headers.addCssClass("SUI-Headers")
        this.content = new VFlexContainer();
        this.content.addCssClass("SUI-Content")
        this.footers = new VFlexContainer();
        this.footers.addCssClass("SUI-Footers")
        this.addChild(this.headers);
        this.addChild(this.content);
        this.addChild(this.footers);

        this.addCssClass("SUI-Page");
    }

    addHeader(header)
    {
        header.addCssClass("SUI-Header")
        this.headers.addChild(header);
    }

    addFooter(footer)
    {
        footer.addCssClass("SUI-Footer")
        this.footers.addChild(footer.element);
    }

    addContent(content)
    {
        this.content.addChild(content);
    }

    removeContent(content)
    {
        this.content.removeChild(content);
    }
}

class HFlexContainer extends Container
{
    constructor()
    {
        super();
        this.addCssClass("SUI-HFlexContainer");
    }
}

class VFlexContainer extends Container
{
    constructor()
    {
        super();
        this.addCssClass("SUI-VFlexContainer");
    }
}

class ButtonContainer extends Container
{
    constructor()
    {
        super();
        this.addCssClass("SUI-ButtonContainer");
    }
}
