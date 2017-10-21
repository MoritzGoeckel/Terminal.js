# TerminalJS
A terminal like UI for the web

# How does it look?
[Check it out](http://moritzgoeckel.com/TerminalJS/)

# Example usage
```html
<html>
	<head>
		<title>Board</title>
		<link rel="stylesheet" href="style.css" />
	</head>

	<body>
		<div id="container">
			<br/>
			<span id="terminalField"></span>
			<span id="inputField"></span>
			
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>		
			<script src="terminal.js"> </script>
			<script>
				function countdown(){
					let number = 10;
					printLine(number, "flag")
					let interval = setInterval(function(){
						updateLine(--number)
						if(number == 0){
							clearInterval(interval);
							printLine("Done!", "highlight")
						}
					}, 500);
				}
				
				printLine("Do an input", "highlight");
				addInputListener(function(line){
				
					printLine("You: " + line, "color_two");
					if(line == "error" || line == "flag" || line == "highlight" || line == "highlight_big")
						printLine(line, line);
						
					if(line == "init")
						countdown();
					
					if(line == "all"){
						printLine("hallo", "error");
						printLine("hallo", "flag");
						printLine("hallo", "highlight");
						printLine("hallo", "highlight_big");
					}
					
				});
			</script>
		</div>
	</body>
</html>
```
