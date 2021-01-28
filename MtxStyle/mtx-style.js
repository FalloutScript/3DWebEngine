//HTML Code
var codeArray = document.querySelectorAll("code");

function formatColor(code, str, color)
{
	code.innerHTML = code.innerHTML.replaceAll(str, "<div style='color:" + color + "; display:inline;'>" + str + "</div>");
}

function formatColorAndChar(code, str, newStr, color)
{
	code.innerHTML = code.innerHTML.replaceAll(str, "<div style='color:" + color + "; display:inline;'>" + newStr + "</div>");
}

codeArray.forEach(code => {
	formatColor(code, "#include", "rgb(200, 100, 100)");
	formatColor(code, "using", "rgb(200, 100, 100)");
	formatColor(code, "return", "rgb(200, 100, 100)");
	formatColor(code, "namespace", "rgb(200, 100, 100)");
});


//HTML Navbar
