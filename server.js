const express = require('express') // Middleware Express utilisé pour créer le serveur (gestion des différentes routes)
const app = express() // Création du serveur app
const mysql = require('mysql') // Module mysql permettant la connexion de notre webapp au serveur de la base de données
const ejs = require('ejs') // Module permettant le rendu HTML généré de manière dynamique (Embedded JavaScript)

const PORT = process.env.PORT || 8080 // Définition du port sur lequel le serveur sera écouté

var result = [] // Contient les résultats de la requête SQL demandé

var connection = mysql.createConnection({
  host: "localhost",
  user: "techni", // admini ou techni
  password: "passtech" // passadm ou passtech
}); // Créée une connexion avec la base de données

app.use('/',express.static(__dirname + '/assets')) // Permet l'utilisation des fichiers présents de le dossier /assets

app.get('/',function(req,res){
  res.status(200).render(__dirname + '/assets/index.ejs',{result:result}) // Fait le rendu de l'index.ejs lors d'une requête GET /
}) 

app.post('/mysql',function(req,res){ // Requête POST du formulaire /mysql
  res.status(200)
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result);
  });
  res.redirect('/') // Fait une redirection à l'adresse principale
}) 


app.listen(PORT,() => { // Démarre le serveur en local sur le port PORT
  console.log('\nServeur démarré !')
  console.log('Ouvrez un navigateur et allez l\'adresse suivante :  localhost:' + PORT)
  console.log('Pour arrêter le serveur, faites CTRL+C dans son terminal/invite de commande')
}) 