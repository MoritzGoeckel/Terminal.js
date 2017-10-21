# TerminalJS
A terminal like UI for the web

# How does it look?
TODO: Create screenshot
![Terminal JS visualization](https://raw.githubusercontent.com/MoritzGoeckel/TerminalJS/old_design/terminal_example_visualization.gif)
This is a screenshot from the branch with the old design

# Example usage
```html
<head>
	<title>Board</title>
	<link rel="stylesheet" href="style.css" />
</head>

<body>
	<div id="container">
		<span id="terminalField"></span>
		<span id="inputField"></span>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="terminal.js"> </script>
		<script>
			setMaxLines(10);
			printLine("Do an input", "red");
			addInputListener(function(line){
				printLine("You: " + line, "white");
			});
		</script>
	</div>
</body>
```
