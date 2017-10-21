# TerminalJS
A terminal like UI for the web

# How does it look?
![Terminal JS visualization](https://raw.githubusercontent.com/MoritzGoeckel/TerminalJS/master/terminal_example_visualization.gif)

# Example usage
´´´html

<head>
	<title>Board</title>
	<link rel="stylesheet" href="style.css" />
</head>

<body>
	<div id="container">
		<span id="terminalField"></span>
		<span id="inputField"></span>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="sketch.min.js"> </script>
		
		<script src="terminal.js"> </script>
		<script src="particles.js"> </script>
		<script>
			setMaxLines(10);
			printLine("Do an input", "red");
			addInputListener(function(line){
				printLine("You: " + line, "white");
				spawnParticles();
			});
		</script>
	</div>
</body>

´´´
