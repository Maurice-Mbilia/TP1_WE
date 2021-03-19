
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

//Classe Drawing
function Drawing() {
    //creer un array forms
    this.forms = new Array();
    //Méthode pour l'ajout dune forme dans le tableau
    this.addForm = function(form) {
        this.forms.push(form);
    };
    // enlever un form à partir d'index
    this.removeForm = function(index) {
        this.forms.splice(index,1);
    };
    this.getForms = function(){
    	return forms;
    }
};

//Classe Form
function Form(epaisseur, couleur) {
    this.epaisseur=epaisseur;
    this.couleur=couleur;
};

//Classe Rectangle
function Rectangle(X, Y, largeur, hauteur, epaisseur, couleur) {
    Form.call(this, epaisseur, couleur);
    this.X=X;
    this.Y=Y;
    this.largeur = largeur;
    this.hauteur = hauteur;
};

//Classe Line
function Line(x1, y1, x2, y2, epaisseur, couleur) {
    Form.call(this, epaisseur, couleur);
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
};
