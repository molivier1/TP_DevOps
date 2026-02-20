const LIGNES = 20;
const COLONNES = 10;
const TAILLE_BLOCS = 30;


const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(TAILLE_BLOCS, TAILLE_BLOCS);