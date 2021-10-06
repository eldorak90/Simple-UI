var ICON_POS = Object.freeze({
    LEFT : 0,
    RIGHT : 1
});

this.counter = 0;

function getNewId()
{
	return "SUI_" + this.counter++;
}

function createCSSLinkElement(cssPath)
{
	var linkElem = document.createElement('link');
		linkElem.setAttribute('rel', 'stylesheet');
		linkElem.setAttribute('href', cssPath);
	
	return linkElem;
}

function getSafeAttribute(obj, attribute, def)
{
	if (obj.hasAttribute(attribute))
	{
		return obj.getAttribute(attribute);
	}
	
	return def;
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



class SuiObject extends HTMLElement
{

	constructor()
	{
		super();
		this.shadow = this.attachShadow({mode: 'closed'});
		
		// Attach the created element to the shadow dom
		this.shadow.appendChild(createCSSLinkElement('dev/css/structure.css'));
		this.shadow.appendChild(createCSSLinkElement('dev/css/style.css'));
	}

}

class SuiView extends SuiObject
{
    constructor(element)
    {
        super();
        this.element = element;
		this.shadow.appendChild(element);
		
		this.initProperties();
		this.initEvents();
		
		this.setId(getNewId());
    }

	initProperties()
	{
        this.settings = {};
	}
	
	initEvents()
	{
        this.eventHandler = {};
        this.eventHandler.attachHandler = new SimpleArray();
        this.eventHandler.detatchHandler = new SimpleArray();
        this.eventHandler.clickHandler = new SimpleArray();
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

class SuiDivControl extends SuiControl
{
	constructor()
    {
        super(document.createElement("div"));
    }
}

class SuiSpanControl extends SuiControl
{
	constructor()
    {
        super(document.createElement("span"));
    }
}

class SuiInputControl extends SuiControl
{
	constructor()
    {
        super(document.createElement("input"));
    }
}

class Button extends SuiDivControl
{
    constructor()
    {
        super();
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

class SuiInput extends SuiInputControl
{
	setType(type)
	{
        this.element.type = type;
	}
	
	getType()
	{
		return this.element.type;
	}
}

class TextBox extends SuiInput
{
    constructor(el)
    {
        super(el);
        this.addCssClass("SUI-TextBox");
    }
}

class TextArea extends SuiInput
{
    constructor()
    {
        super(document.createElement("textarea"));
        this.addCssClass("SUI-TextArea");
    }
}

class Checkbox extends SuiInputControl
{
    constructor()
    {
        super();
        this.element.type = "checkbox";
        this.addCssClass("SUI-CheckBox");
    }
}

class RadioGroup extends SuiDivControl
{
    constructor()
    {
        super();
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

class RadioButton extends SuiInputControl
{
    constructor()
    {
        super();
        this.element.type = "radio";
        this.addCssClass("SUI-RadioButton");
    }
}

class Icon extends SuiSpanControl
{   
    constructor()
    {
        super();
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

class Image extends SuiControl
{
    constructor()
    {
        super(document.createElement("img"));
        this.addCssClass("SUI-Image");
    }
}

class Text extends SuiSpanControl
{
    constructor()
    {
        super();
        this.addCssClass("SUI-Text");
    }

    setText(text)
    {
        this.element.innerText = text;
    }
	
	setFontWeight(weight)
	{
		this.element.style.fontWeight = weight;
	}
	
	setFontStyle(style)
	{
		this.element.style.fontStyle = style;
	}
	
	setColor(color)
	{
		this.element.style.color = color;
	}
	
	setBackground(background)
	{
		this.element.style.background = background;
	}
}

class Label extends Text
{
    constructor()
    {
        super();
        this.addCssClass("SUI-Label");
    }
    
    setText(text)
    {
        this.element.innerText = text;
    }
}

class HTML extends SuiDivControl
{
    constructor()
    {
        super();
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

class Slider extends SuiDivControl
{
    constructor()
    {
        super();
        this.addCssClass("SUI-Slider");
		
		this.bar = document.createElement("div");
		this.bar.classList.add("SUI-Slider-bar");
		this.element.appendChild(this.bar);
		
		this.drag = document.createElement("div");
		this.drag.classList.add("SUI-Slider-drag");
		this.element.appendChild(this.drag);
		
		this.tag = document.createElement("div");
		this.tag.classList.add("SUI-Slider-tag");
		this.element.appendChild(this.tag);
		
		
		
		setTimeout(() => {
		this.min.set(getSafeAttribute(this, "data-min", 0));
		this.max.set(getSafeAttribute(this, "data-max", 100));
		this.value.set(getSafeAttribute(this, "data-value", 0));
		}, 2);
		
		this.min.addChangeHandler((ev) => {
			this.setValue(this.value.get());
		});
		
		this.max.addChangeHandler ((ev) => {
			this.setValue(this.value.get());
		});
		
		this.value.addChangeHandler((ev) => {
			var range = this.max.get() - this.min.get();
			var cleanValue = ev - this.min.get();
			var width = this.element.offsetWidth - this.drag.offsetWidth;
			var left = width / range * cleanValue + "px";
			
			this.drag.style.left = left;
			this.tag.style.right = null;
			this.tag.style.left = left;
			this.element.setAttribute("value", this.value.get());
			this.tag.innerText = this.value.get();
			
			var rect = this.tag.getBoundingClientRect();
			if (rect.top < 0)
			{
				this.tag.style.marginTop = "1.35rem";
			}
			if (rect.right > window.innerWidth)
			{
				this.tag.style.right = "0";
				this.tag.style.left = null;
			}
		});
		
        this.element.onmousedown = (evDown) => {
			
			this.calcPos(evDown);
			
			document.onmousemove = (evMove) =>{
				this.calcPos(evMove);
			}
			
			document.onmouseup = () =>{
				document.onmousemove = null;
				document.onmouseup = null;
				this.tag.style.display = null;
			}
		};
    }
	
	initProperties()
	{
		super.initProperties();
		this.min = new SuiProperty();
		this.max = new SuiProperty();
		this.value = new SuiProperty();
		this.min.set(0);
		this.max.set(100);
		this.value.set(0);
	}
	
	initEvents()
	{
		super.initEvents();
	}

	calcPos(ev)
	{
		var width = this.element.offsetWidth - this.drag.offsetWidth / 2;
		var range = this.max.get() - this.min.get();
		var left = Math.min(Math.max(0, ev.offsetX), width);
		var value = Math.round(left / (width / range)) + parseInt(this.min.get());
		this.setValue(value);
		
		this.tag.style.display = "block";	
	}

	setMin(min)
	{
		this.min.set(min);
	}
	
	setMax(max)
	{
		this.max.set(max);
	}
	
	setValue(value)
	{
		this.value.set(value);
	}

	getValue()
	{
		return this.value;
	}
	
	setBarBackground(background)
	{
		this.bar.style.background = background;
	}
}


customElements.define('sui-slider', Slider);
customElements.define('sui-textbox', TextBox);
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




