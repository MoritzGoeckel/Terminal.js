ctrlDown = false;

$().ready(function(){
	
	$( "body" ).keydown(function(event) {
		processKey(event.key);
	});
	
	$("body").keydown(function(e) {
        if (e.keyCode == 17 || e.keyCode == 91) ctrlDown = true;
    }).keyup(function(e) {
        if (e.keyCode == 17 || e.keyCode == 91) ctrlDown = false;
    });
	
	$("body").on('paste', function(e) {
		var pasteData = e.originalEvent.clipboardData.getData('text');
		for(var i = 0; i < pasteData.length; i++)
			processKey(pasteData[i], true);
	});
	
	setInterval(function()
		{ 
			showBlock = (showBlock ? false : true);
			if(moving)
			{
				showBlock = true;
				moving = false;
			}
			
			renderInput(); 
		}, 500);
		
});

inputIndex = 0;
inputhistoryIndex = 0;
inputHistory = [];
input = "";
showBlock = true;
moving = false;

function processKey(key, ingoreCtrl = false)
{
	if(key == "Backspace")
	{
		input = input.substr(0, input.length - inputIndex - 1) + input.substr(input.length - inputIndex);
		inputhistoryIndex = 0;
		
		if(inputIndex > input.length)
			inputIndex = input.length;
	}
	if(key == "Delete")
	{
		input = input.substr(0, input.length - inputIndex) + input.substr(input.length - inputIndex + 1);
		inputhistoryIndex = 0;
		
		if(inputIndex > input.length)
			inputIndex = input.length;
	}
	else if(key == "Enter")
	{
		if((inputHistory[0] == "" || inputHistory[0] == " "))
			inputHistory.shift();
		
		if(inputHistory[0] != input)
			inputHistory.unshift(input);
		
		inputhistoryIndex = 0;
		submitInput(input);
		input = "";
		
		inputIndex = 0;
	}
	else if(key == "ArrowUp")
	{
		if(inputhistoryIndex == 0 && inputHistory[0] != input)
			inputHistory.unshift(input);
		
		if(inputhistoryIndex < inputHistory.length - 1)
		{	
			inputhistoryIndex++;
			input = inputHistory[inputhistoryIndex];
		}
		
		inputIndex = 0;
	}
	else if(key == "ArrowDown")
	{
		if(inputhistoryIndex > 0)
		{	
			inputhistoryIndex--;
			input = inputHistory[inputhistoryIndex];
		}
		
		if(inputhistoryIndex == 0 && (inputHistory[0] == "" || inputHistory[0] == " "))
			inputHistory.shift();
		
		inputIndex = 0;
	}
	else if(key == "ArrowLeft")
	{
		if(inputIndex < input.length)
			inputIndex++;
	}
	else if(key == "ArrowRight")
	{
		if(inputIndex > 0)
			inputIndex--;
	}
	else if(key == "PageUp"){
		scrollUp();
	}
	else if(key == "PageDown"){
		scrollDown();
	}
	else if(key == "End"){
		scrollToBottom();
	}
	else if(key.length == 1 && (ctrlDown == false || ingoreCtrl))
	{
		historyIndex = 0;
		if(inputIndex == 0)
			input += key;
		else
			input = input.substr(0, input.length - inputIndex) + key + input.substr(input.length - inputIndex);
	}
	
	moving = true;
	
	renderInput();
}

function renderInput()
{
	$("#inputField").html("<span class='input'>" + input.substr(0, input.length - inputIndex) + (showBlock ? "<span class='input'>&block;</span>" : "  ") + input.substr(input.length - inputIndex) + "</span>");
}

function submitInput(line)
{
	if(line != "" && line != " ")
	{
		printLine(line);
		for(var i = 0; i < listeners.length; i++)
			listeners[i](line);
	}
}

listeners = [];
function addInputListener(func)
{
	listeners.push(func);
}

var desiredHight = null;

function updateLine(str, cssClass){
	if(cssClass == null)
		cssClass = "default_cmd";
		
	$("#terminalField").find("span").last().replaceWith($("<span class='"+cssClass+"'>" + str + "</span>"));
}

linebufferUp = [];
linebufferDown = [];

function scrollUp(){
	if(linebufferUp.length > 0){
		if($("#inputField").is(":visible"))
			 $("#inputField").hide();

		$("#terminalField").prepend($("<br />"));				
		$("#terminalField").prepend(linebufferUp.shift());

		while($("#terminalField").height() + 100 > desiredHight){
			let removedElement = $("#terminalField").find("span").last();
			removedElement.remove();
			linebufferDown.unshift(removedElement);	
			
			$("#terminalField").find("br").last().remove();		
		}
	}
}

function scrollDown(){
	if(linebufferDown.length > 0){
		
		$("#terminalField").append(linebufferDown.shift());
		$("#terminalField").append($("<br />"));				

		checkRemoveLineUp();

		if(linebufferDown.length == 0){
			$("#inputField").show();
		}
	}
}

function scrollToBottom(){
	while(linebufferDown.length > 0)
		scrollDown();
}

function printLine(str, cssClass)
{
	if(cssClass == null)
		cssClass = "default_cmd";
		
	var start = "<span class='"+cssClass+"'>";
	var end = "</span><br />";
	
	let element = $(start + str + end);
	$("#terminalField").append(element);
		
	if(desiredHight == null){
		desiredHight = $("#container").height()
	}
	
	checkRemoveLineUp();
}

function checkRemoveLineUp(){
	while($("#terminalField").height() + 100 > desiredHight){
		let removedElement = $("#terminalField").find("span").first();
		removedElement.remove();
		linebufferUp.unshift(removedElement);	
		
		$("#terminalField").find("br").first().remove();		
	}
}

function clear(){
	$("#terminalField").html("");
}