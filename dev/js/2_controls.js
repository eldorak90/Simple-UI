
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

}

class TextBox extends SuiInput
{
    constructor(el)
    {
        super(el);
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
		
		this.min = new SuiProperty();
		this.max = new SuiProperty();
		this.value = new SuiProperty();
		
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
			this.tag.style.left = left;
			this.element.setAttribute("value", this.value.get());
			this.tag.innerText = this.value.get();
		});
		
        this.element.onmousedown = () => {
			document.onmousemove = (ev) =>{
				var left = Math.min(Math.max(0, ev.offsetX), this.element.offsetWidth - this.drag.offsetWidth);
				var range = this.max.get() - this.min.get();
				var width = this.element.offsetWidth - this.drag.offsetWidth;
				this.setValue(Math.round(left / (width / range) + this.min.get()));
				
				this.tag.style.display = "block";
			}
			
			document.onmouseup = () =>{
				document.onmousemove = null;
				document.onmouseup = null;
				this.tag.style.display = null;
			}
		};
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

