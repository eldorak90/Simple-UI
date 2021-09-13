class List extends SuiView
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("SUI-List");
    }

    addItem(listItem)
    {
        this.element.appendChild(listItem.element);
    }

    addContextControl(control)
    {
        
    }

}

class ListItem extends SuiView
{
    constructor()
    {
        super();
        this.element = document.createElement("div");
        this.addCssClass("SUI-ListItem");
    }
}

class CustomListItem extends ListItem
{
    constructor()
    {
        super();
    }

    addControl(control)
    {
        this.element.appendChild(control.element);
    }
}