$( document ).ready(function() {
    var core = new Core();

    var page = new Page();

    var button = new Button();
    var text = new TextBox();

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
    header.addChild(new Spacer());
    var text = new Text();
    text.setText("Titel");
    header.addChild(text);
    header.addChild(new Spacer());
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
    page2.addContent(vFlex);
    core.showPage(page2);
});
