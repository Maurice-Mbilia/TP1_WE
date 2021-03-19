
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

Rectangle.prototype.paint = function(ctx) {
	ctx.beginPath();
	ctx.lineWidth = this.epaisseur;
	ctx.strokeStyle = this.couleur;
	ctx.rect(this.X, this.Y, this.largeur, this.hauteur);
	ctx.stroke();
};

Line.prototype.paint = function(ctx) {
	ctx.beginPath();
	ctx.lineWidth = this.epaisseur;
	ctx.strokeStyle = this.couleur;

	ctx.moveTo(this.x1, this.y1);
	ctx.lineTo(this.x2, this.y2);
	ctx.stroke();

};

Drawing.prototype.paint = function(ctx) {
	console.log(this.getForms());
	ctx.fillStyle = '#F0F0F0'; // set canvas' background color
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	this.getForms().forEach(function(eltDuTableau) {
		// now fill the canvas
		eltDuTableau.paint(ctx);
	});
};

// Question 12
Drawing.prototype.updateShapeList = function(form){
	  //Récupération de l'élément shapelist
    var myShapeList = document.getElementById('shapeList');
}