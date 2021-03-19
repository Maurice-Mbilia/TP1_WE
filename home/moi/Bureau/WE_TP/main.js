
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width=900
canvas.height=600

// Code temporaire pour tester le DnD
new DnD(canvas);
ctx.fillStyle = '#F0F0F0'; // set canvas' background color
ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas
/////

// Code temporaire pour tester l'affiche de la vue
var rec = new Rectangle(50, 50, 300, 150, 5, '#FF2200');
rec.paint(ctx);
var line = new Line(400, 400, 600, 100, 5, '#49FF35');
line.paint(ctx);
// tester également Dessin.
////

// Code final à utiliser pour manipuler Pencil.
var drawing = new Drawing();
var pencil = new Pencil(ctx, drawing, canvas);
drawing.paint(ctx, canvas);

