
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	this.cordinitx = 0;
    this.cordinity = 0;
    this.cordfinalx = 0;
    this.cordfinaly = 0;


	// Developper les 3 fonctions gérant les événements
    this.maFctGerantLaPression = function(evt) {


    			this.cordinitx = getMousePosition(canvas,evt).x;
    			this.cordinity= getMousePosition(canvas,evt).y;
    			console.log("presser");
        		console.log(this.cordinitx);
    			console.log(this.cordinity);

    	}.bind(this);

    this.maFctGerantLeDeplacement = function(evt) {
    		this.cordinitx = getMousePosition(canvas,evt).x;
    		this.cordinity= getMousePosition(canvas,evt).y;
            console.log("deplacement");
            console.log(this.cordinitx);
    		console.log(this.cordinity);
    	}.bind(this);

    this.maFctGerantLeRelachement = function(evt) {
    		this.cordinitx = getMousePosition(canvas,evt).x;
    		this.cordinity= getMousePosition(canvas,evt).y;
            console.log("relachement");
            console.log(this.cordinitx);
    		console.log(this.cordinity);
    	}.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.

	canvas.addEventListener('mousedown', this.maFctGerantLaPression, false);
    canvas.addEventListener('mouseup', this.maFctGerantLeRelachement, false);
    canvas.addEventListener('mousemove',this.maFctGerantLeDeplacement, false);

};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



