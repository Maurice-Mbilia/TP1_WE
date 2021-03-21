

L'objectif

L’objectif de ce TP consiste à créer une application Web pour faire du dessin vectoriel, i.e. pour dessiner des rectangles, des lignes, ainsi que définir leur couleur et leur épaisseur de trait.

Le but

Le but du TP est de construire à la main une application Web suffisamment complexe pour nécessiter la mise en place d’un MVC  du côté client.

Démarrage du projet

Le démarrage effectif du projet commence par un fork ou un download du squelette  L'objectif
sur:  https://github.com/barais/tpWeb
qui fourni un fichier canvas.css. Ce fichier décrit des styles utilisés par le programme et il n’y arien à faire dessus. Le fichier canvas.html est un document HTML décrivant la structure du programme: un Canvas, des boutons à bascule (toggle button), un sélectionneur de couleur (widget HTML5) et un bouton fléché (spinner) permettant de choisir l'épaisseur de trait. Ce document importe le document css et les documents Javascript nécessaires à l’exécution et l’affichage du programme Web de puis l’environnement de développement Intellij. 










Modèle Vue Contrôleur (VMC) 






Interaction : le glisser-déposer (Drag-n-Drop)
Dans cette partie, il s’agit de construire le DnD. Nous avons commencé par l'implémentation d'une interaction homme-machine tout en se servant de l’interacteur et du canvas (c’est ce DnD qui sera utilisé dans notre application Web pour dessiner des rectangles et des lignes).
La classe DnD a 4 atttibuts, qui sont les coordonnées de la position initiale du DnD (2 attributs) et les 2 autres pour la position finale. Ces 4 attributs sont:
cordinitx = 0;
cordinity = 0;
cordfinalx = 0;
cordfinaly = 0;
Et puis nous avons déclaré 3 fonctions à cette classe correspondant aux 3 types d'événements à gérer; et qu’il ne faut surtout pas oublier de binder chacune des fonctions à la classe DnD.
L’implémentation de ces fonctions a pour but de définir la valeur des attributs.
Ci-dessous, l’implémentation de l’une des 3 fonctionnalités :
this.maFctGerantLaPression = function(evt) {    
  this.cordinitx = getMousePosition(canvas,evt).x;
  this.cordinity= getMousePosition(canvas,evt).y;
  console.log("presser");
  console.log(this.cordinitx);
  console.log(this.cordinity);  
        }.bind(this);
  

Apres avoir bindé les 3 fonctions, nous a enregistré chaque fonction auprès du canvas (addEventListener).
Le canvas est un objet HTML5 sur lequel il est possible de brancher des fonctions pour notamment récupérer les événements souris


canvas.addEventListener('mousedown', this.maFctGerantLaPression, false);
canvas.addEventListener('mouseup', this.maFctGerantLeRelachement, false);
canvas.addEventListener('mousemove',this.maFctGerantLeDeplacement, false);      

Il convient de noter que dans les 3 fonctions, nous avons  a appelé console.log. Et c’est pour l’affichage dans la console Javascript de notre navigateur les coordonnées de chaque événement lors de l'exécution de interaction.js 
...
console.log("relachement");
console.log(this.cordinitx);
console.log(this.cordinity);
Le modèle

Pour le modèle, nous avons l’implémentation de ces 4 classes ci-dessous; et elles sont 4  nécessaires pour définir le modèle dans le fichier model.js. Ces classes sont:

    1. Rectangle 
    2. Line 
    3. Form 
    4. Drawing 
function RectangleY(X, , largeur, hauteur, epaisseur, couleur) {
    Form.call(this, epaisseur, couleur);
    this.X=X;
    this.Y=Y;
    this.largeur = largeur;
    this.hauteur = hauteur;
};
function Line(x1, y1, x2, y2, epaisseur, couleur) {
    Form.call(this, epaisseur, couleur);
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
};
La classe Drawing nous permet de créer ou enlever une form.
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
function Form(epaisseur, couleur) {
    this.epaisseur=epaisseur;
    this.couleur=couleur;
};

La vue

La vue est une représentation graphique possible du modèle. Dans le cadre de ce projet, le modèle est déjà hautement graphique. Ainsi, on a donc possédé à l’implémentation de 4 fonctions dans le fichiers views.js pour rajouter les fonctions d’affichage.  

Par exemple pour Line on ce qui suit:

Line.prototype.paint = function(ctx) {
        ctx.beginPath();
        ctx.lineWidth = this.epaisseur;
        ctx.strokeStyle = this.couleur;
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
};

Le contrôleur

Pour rendre l'application interactive, il faut donc définir un interacteur. Un interacteur est une sorte d'outil que l'utilisateur manipule pour réaliser des actions. Dans notre cas, l'interacteur sera donc un crayon (Pencil dans le fichier controler.js) que l'utilisateur va manipuler pour ajouter des formes au dessin. 

A titre exemplatif, nous allons illustrer la fonction Pencil()...
function Pencil(ctx, drawing, canvas) {
        this.currEditingMode = editingMode.line;
        this.currLineWidth = 5;
        this.currColour = '#000000';
        this.currentShape = 0;
 ... 

this.onInteractionStart = function(DnD) {
                // recuperer les bouton de canvas.html
                var butRect = document.getElementById('butRect');
                var butLine = document.getElementById('butLine');
                var spinnerWidth = document.getElementById('spinnerWidth');
                var colour = document.getElementById('colour');

Des modifications à apporter

Il y a 2 modifications à faire, qui consiste à l’implémentation des 2 nouvelles fonctions.             Nous avons la fonction  updateShapeList() que nous rajoutons dans le fichier view.js  pour récupérer l’élément shapelist, et une autre modification c’est pour le bouton dans le fichier 
canvas.html:
<button type="button" class="btn btn-default">
        <span class="glyphicon glyphicon-remove-sign"></span>
</button>

