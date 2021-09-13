class SuiObject
{


}

class SuiView extends SuiObject
{
    constructor(element)
    {
        super();
        this.element = element;
        this.eventHandler = {};
        this.settings = {};

        this.eventHandler.attachHandler = new SimpleArray();
        this.eventHandler.detatchHandler = new SimpleArray();
        this.eventHandler.clickHandler = new SimpleArray();
		
		this.setId(getNewId());
    }

    render()
    {
    }

    clone()
    {
        let obj = JSON.parse(JSON.stringify(this));
        obj.eventHandler = this.eventHandler;
        obj.element = this.element.cloneNode(true);
        return obj;
    }

    addAttachHandler(handler)
    {
        this.eventHandler.attachHandler.push(handler);
    }

    removeAttachHandler(handler)
    {
        this.eventHandler.attachHandler.remove(handler);
    }

    addDetatchHandler(handler)
    {
        this.eventHandler.detatchHandler.push(handler);
    }

    removeDetatchHandler(handler)
    {
        this.eventHandler.detatchHandler.remove(handler);
    }

    addClickHandler(handler)
    {
        var that = this;
        this.eventHandler.clickHandler.push(handler);
        if (this.eventHandler.clickHandler.length() == 1)
        {
            this.eventHandler.clickFunction = function(event){
                that.eventHandler.clickHandler.execute(event);
            };
            this.element.onclick = this.eventHandler.clickFunction;
        }
    }

    removeClickHandler(handler)
    {
        this.eventHandler.clickHandler.remove(handler);

        if (this.eventHandler.clickHandler.length() == 0)
        {
            this.element.onclick = undefined;
            this.eventHandler.clickFunction = undefined;
        }
    }

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
	
	setId(id)
	{
		this.element.id = id;
	}
	
	getId()
	{
		return this.element.id;
	}
}

class SuiCore extends SuiView
{
    constructor()
    {
        super(document.getElementsByTagName("BODY")[0]);
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

class SuiDiv extends SuiView
{
    constructor()
    {
        super(document.createElement("div"));
    }
}

class SuiContainer extends SuiDiv
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


class SuiControl extends SuiView
{
    constructor(element)
    {
        super(element);
    }

    setLabel(label)
    {
        if (typeof(label) === Label)
        {
            this.label = label;
        }
        else if (typeof(label) === String)
        {
            var l = new Label();
            l.setText(label);
            this.label = l;
        }
    }

    getLabel()
    {
        return this.label;
    }
}

class SuiSpacer extends SuiDiv
{
    constructor()
    {
        super();
        this.addCssClass("SUI-Spacer");
    }
}

class SuiProperty
{
	constructor()
	{
        this.eventHandler = {};
        this.eventHandler.changeHandler = new SimpleArray();
	}
	
	addChangeHandler(handler)
	{
		this.eventHandler.changeHandler.push(handler);
	}
	
	get()
	{
		return this.value;
	}
	
	set(value, fireEvent = true)
	{
		this.value = value;
		
		if (fireEvent)
		{
			this.eventHandler.changeHandler.execute(value);
		}
	}
	
	bind(property)
	{
		property.addChangeHandler((ev)=>{
			this.set(property.get());
		});
	}
	
	twoWayBind(property)
	{
		property.bind(this);
		bind(property);
	}
}

