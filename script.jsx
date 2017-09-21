app.preferences.rulerUnits = Units.PIXELS;

// open files containing the patterns
var shades = new File((File($.fileName).parent.toString()+'/shades.PNG'));
app.open(shades);
shades.close();

// original dimensions
var w = app.activeDocument.width;
var h = app.activeDocument.height;
var imgX = 0;
var imgY = 0;
var imgL = 8;

function translateToNextPattern(){
	if (imgX >= w-imgL){
		app.activeDocument.activeLayer.translate(imgX,-imgL);
		imgX = 0;
		imgY += imgL;
		return;
	}
	app.activeDocument.activeLayer.translate(-imgL);
	imgX += imgL;
}

app.activeDocument.resizeCanvas(imgL,imgL,AnchorPosition.TOPLEFT);

function generatePattern(name){
	var definePattern_ID = app.charIDToTypeID('DfnP');
	var name_ID = app.charIDToTypeID('Nm  ');
	var desc = new ActionDescriptor();

	desc.putString(name_ID, name);

	app.executeAction(definePattern_ID, desc);
}

for (var i = 0; i < w/imgL; i++){
	generatePattern('black'+i);
	translateToNextPattern();
}

for (var i = 0; i < w/imgL; i++){
	generatePattern('white'+i);
	translateToNextPattern();
}

app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);