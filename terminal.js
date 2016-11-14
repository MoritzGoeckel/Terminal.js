 ctrlDown = false;

$().ready(function(){
	
	$( "body" ).keydown(function(event) {
		//console.log(event);
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
	
	console.log("Init finished");
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
	$("#inputField").html("<span class='green'>" + input.substr(0, input.length - inputIndex) + (showBlock ? "<span class='green'>&block;</span>" : "  ") + input.substr(input.length - inputIndex) + "</span>");
}

function submitInput(line)
{
	if(line != "" && line != " ")
	{
		printLine(line, "green");
		for(var i = 0; i < listeners.length; i++)
			listeners[i](line);
	}
}

listeners = [];
function addInputListener(func)
{
	listeners.push(func);
}

output = "";
maxLines = 10;

function setMaxLines(lines)
{
	maxLines = lines;
}

function printLine(str, cssClass)
{
	var start = "<span class='"+cssClass+"'>";
	var end = "</span>";
	
	output += start + str + end + "<br />";
	var outputLineArray = output.split('<br />');
	if(outputLineArray.length-1 > maxLines)
	{
		output = "";
		for(var i = 1; i < outputLineArray.length; i++)
			if(outputLineArray[i] != "" && outputLineArray[i] != " ")
				output += outputLineArray[i] + "<br />";
	}

	$("#terminalField").html(output);
}