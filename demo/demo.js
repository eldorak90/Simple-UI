$( document ).ready(function() {
    var core = new Core();

    var page = new Page();

    var button = new Button();
    var text = new TextBox();

    page.addChild(button);
    page.addChild(text);

    core.showPage(page);

    var page2 = new Page();
    page2.addChild(new Button());
    core.showPage(page2);
});
