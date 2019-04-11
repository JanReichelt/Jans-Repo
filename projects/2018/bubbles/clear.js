function cCanvas() {
	var canvaslist = document.getElementsByTagName('CANVAS');
	var body = document.getElementsByTagName('BODY')[0]; 
	for(var i = 0; i < canvaslist.length; i++) {
		body.removeChild(canvaslist[i]);
	}
}
