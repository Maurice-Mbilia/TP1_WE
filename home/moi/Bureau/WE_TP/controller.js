
var editingMode = {
	rect : 0,
	line : 1
};

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#000000';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents
	// ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate
	// et onInteractionEnd
	this.onInteractionStart = function(DnD) {
		// recuperer les bouton de canvas.html
		var butRect = document.getElementById('butRect');
		var butLine = document.getElementById('butLine');
		var spinnerWidth = document.getElementById('spinnerWidth');
		var colour = document.getElementById('colour');

		this.currLineWidth = spinnerWidth.value;
		this.currColour = colour.value;

		// test sur la forme sélectionnée
		if (butRect.checked) {
			this.currEditingMode = editingMode.rect;
		} else if (butLine.checked) {
			this.currEditingMode = editingMode.line;
		}

		// creation de la forme selectionnée
		switch (this.currEditingMode) {

		// rectangle
		case editingMode.rect: {

			var largeur = DnD.cordfinalx - DnD.cordinitx;
			var hauteur =  DnD.cordfinaly - DnD.cordinity;
			this.currentShape = new Rectangle(DnD.cordinitx, DnD.cordinity,largeur, hauteur, this.currLineWidth, this.currColour);
			break;
		}
			// Création de la ligne
		case editingMode.line: {

			this.currentShape = new Line(DnD.cordinitx, DnD.cordinity,DnD.cordfinalx, DnD.cordfinaly, this.currLineWidth, this.currColour);
			break;
		}
		}

	}.bind(this);

	this.onInteractionUpdate = function(DnD) {

		if (butRect.checked) {
			// Création du rectangle
			var largeur = DnD.cordfinalx - DnD.cordinitx;
			var hauteur = DnD.cordfinaly - DnD.cordinity;
			this.currentShape = new Rectangle(DnD.cordinitx, DnD.cordinity,largeur, hauteur, this.currLineWidth, this.currColour);
		} else if (butLine.checked) {
			// Création de la ligne
			this.currentShape = new Line(DnD.cordinitx, DnD.cordinity,DnD.cordfinalx, DnD.cordfinaly, this.currLineWidth, this.currColour);
		}
		// On reinitialise le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawing.paint(ctx);
		this.currentShape.paint(ctx);

	}.bind(this);

	this.onInteractionEnd = function(DnD) {
		if (butRect.checked) {
			// Création du rectangle
			var largeur = DnD.cordfinalx - DnD.cordinitx;
			var hauteur = DnD.cordfinaly - DnD.cordinity;
			this.currentShape = new Rectangle(DnD.cordinitx, DnD.cordinity,
					largeur, hauteur, this.currLineWidth, this.currColour);
		} else if (butLine.checked) {
			// Création de la ligne
			this.currentShape = new Line(DnD.cordinitx, DnD.cordinity,
					DnD.cordfinalx, DnD.cordfinaly, this.currLineWidth,
					this.currColour);
		}
		// On reinitialise le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Ajout une  forme au canvas
		drawing.addForm(this.currentShape);
		// On recree la liste de dessins du canvas
		drawing.paint(ctx, canvas);
		// Mise à jour de la liste de formes
		drawing.updateShapeList(this.currentShape);
		// Réinitialisation de la forme courante
		this.currentShape = null;

	}.bind(this);
};


