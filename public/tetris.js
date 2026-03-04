/*const LIGNES = 20;
const COLONNES = 10;
const TAILLE_BLOCS = 30;


const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(TAILLE_BLOCS, TAILLE_BLOCS);*/

function posterScore() {
    let nom = document.getElementById("nom").value
    let score = document.getElementById("score").value
    
    fetch("http://localhost:8080/score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom: nom,
            score: score
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Score envoyé !");
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}



function recupScores() {
    fetch("/scores")
        .then(response => response.json())
        .then(data => {
            const liste = document.getElementById("listeScores");
            liste.innerHTML = "";

            data.forEach(score => {
                const li = document.createElement("li");
                li.textContent = `${score.nom} - ${score.score}`;
                liste.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Erreur récupération scores :", error);
        });
}

window.onload = function() {
    recupScores();
};