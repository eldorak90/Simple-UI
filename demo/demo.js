$( document ).ready(function() {
    var core = new SuiCore();

    var page = new Page();

    var button = new Button();
    var text = new TextBox();

	var getHSL = function (h, s, l) {
            return "hsl(" + h + ", " + s + "%, " + l + "%)";
        };

	var getHueGradient = function (values) {
            return "linear-gradient(to right, " + getHSL(0, 100, 50) +
                ", " + getHSL(60, 100, 50) +
                ", " + getHSL(120, 100, 50) +
                ", " + getHSL(180, 100, 50) +
                ", " + getHSL(240, 100, 50) +
                ", " + getHSL(300, 100, 50) +
                ", " + getHSL(360, 100, 50) +
                ")";
        };

    page.addContent(button);
    page.addContent(text);

    core.showPage(page);

    var page2 = new Page();
    
    var header = new HFlexContainer();
    var icon = new Icon();
    icon.setIconCode("3d_rotation");
    var leftButton = new Button();
    leftButton.setIcon(icon);
    header.addChild(leftButton);
    header.addChild(new SuiSpacer());
    var text = new Text();
    text.setText("Titel");
    header.addChild(text);
    header.addChild(new SuiSpacer());
    var rightButton = new Button();
    rightButton.setText("Button Text");
    header.addChild(rightButton);
    page2.addHeader(header);

    var vFlex = new VFlexContainer();
    vFlex.addChild(new Button());
    vFlex.addChild(new TextBox());
    vFlex.addChild(new Checkbox());
    vFlex.addChild(new TextArea());
    vFlex.addChild(new RadioGroup());
	var s = new Slider();
	s.setMin(0);
	s.setMax(360);
	s.setBarBackground(getHueGradient());
    vFlex.addChild(s);
    page2.addContent(vFlex);
    core.showPage(page2);

    var page3 = new Page();

    var form = new SimpleForm();
    var tb = new TextBox();
    tb.setLabel("Test");
    form.addChild(tb);
    page3.addChild(form);

    //core.showPage(page3);

    /*
    var page3 = new Page();

    var list = new List();
    var itm = new ListItem();
    itm.addClickHandler(function(event){
        console.log("Item clicked!");
    });

    list.addItem(itm);
    console.log(itm);
    
    var cln = itm.clone();
    list.addItem(cln);
    console.log(cln);

    list.addItem(new ListItem());

    page3.addContent(list);

    core.showPage(page3);
    */
});
