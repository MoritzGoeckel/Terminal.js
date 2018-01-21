# Web Terminal
A terminal like UI for the web. [Check it out!](http://moritzgoeckel.com/TerminalJS/)

# Features / Keys
* Page up
* Page down
* End
* Arrow up
* Arrow down
* Arrow left
* Arrow right
* Ctrl + v
* Typing
* Enter

# Example usage
```html
<html>
	<head>
		<title>Terminal</title>
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
					printLine(number)
					let interval = setInterval(function(){
						updateLine(--number)
						if(number == 0){
							clearInterval(interval);
							printLine("Done!")
						}
					}, 500);
				}
				
				printLine("Do an input");
				addInputListener(function(line){
				
					printLine(">>> " + line);
						
					if(line == "init")
						countdown();
										
					if(line == "clear")
						clear();
				});
			</script>
		</div>
	</body>
</html>
```
