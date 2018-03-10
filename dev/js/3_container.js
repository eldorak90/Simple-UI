
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