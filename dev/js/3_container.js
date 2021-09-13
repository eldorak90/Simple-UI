class Page extends SuiContainer
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

class HFlexContainer extends SuiContainer
{
    constructor()
    {
        super();
        this.addCssClass("SUI-HFlexContainer");
    }
}

class VFlexContainer extends SuiContainer
{
    constructor()
    {
        super();
        this.addCssClass("SUI-VFlexContainer");
    }
}

class ButtonContainer extends SuiContainer
{
    constructor()
    {
        super();
        this.addCssClass("SUI-ButtonContainer");
    }
}

class Form extends SuiContainer
{
    constructor()
    {
        super();
        this.addCssClass("SUI-Form");
    }


}

class SimpleForm extends Form
{
    
    constructor()
    {
        super();
        this.addCssClass("SUI-SimpleForm");
        this.controls = [];
    }

    addChild(child)
    {
        this.controls.push(child);
    }

    removeChild(child)
    {
        this.controls.pop(child);
    }

    setLayout()
    {

    }

    refresh()
    {
        for(var control in this.controls)
        {
            var c = new HFlexContainer();
            c.addChild(control.getLabel());
            c.addChild(control.element);
            this.addChild(c);
        }
    }
}