const express = require('express') // Middleware Express utilisé pour créer le serveur (gestion des différentes routes)
const app = express() // Création du serveur app
const mysql = require('mysql') // Module mysql permettant la connexion de notre webapp au serveur de la base de données
const ejs = require('ejs') // Module permettant le rendu HTML généré de manière dynamique (Embedded JavaScript)

const PORT = process.env.PORT || 8080 // Définition du port sur lequel le serveur sera écouté

var result = [] // Contient les résultats de la requête SQL demandé
var result2 = [] // Contient les résultats de la requête SQL demandé
var idvalue = [] // Contient les résultats de la requête SQL demandé


app.use('/',express.static(__dirname + '/assets')) // Permet l'utilisation des fichiers présents de le dossier /assets

app.get('/',function(req,res){
  res.status(200).render(__dirname + '/assets/index.ejs',{result:result}) // Fait le rendu de l'index.ejs lors d'une requête GET /
}) 

app.get('/affich',function(req,res){
  res.status(200).render(__dirname + '/assets/affich.ejs',{result:result,user:connection.config.user}) // Fait le rendu de techn.ejs lors d'une requête GET /
  console.log(connection.config.user)

}) 

app.get('/ajoutclient',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutclient.ejs',{result:result,result2:result2,idvalue:idvalue}) // Fait le rendu de techn.ejs lors d'une requête GET /
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.commune", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result);
  });
  connection.query("SELECT * FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result2 = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result2);
  });
  connection.query("SELECT MAX(idclient) FROM projet.client", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    idmax = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
	console.log(idmax)
	idmaxobj=JSON.parse(JSON.stringify(idmax)); 
	valueidmax=Object.values(idmaxobj[0])[0]
	if (!valueidmax){
		idvalue=1
		console.log('1')}
	else{
	idvalue=valueidmax+1
	console.log('2')};
		
  });


}) 


app.post('/mysql/select/admin',function(req,res){ // Requête POST du formulaire /mysql
  res.status(200)
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result);
  });
  res.redirect('/affich') // Fait une redirection à l'adresse principale
}) 

app.post('/mysql/select/techn',function(req,res){ // Requête POST du formulaire /mysql
  res.status(200)
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.technicien", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result);
  });
  res.redirect('/affich') // Fait une redirection à l'adresse test
}) 

app.get('/conn/admi',function(req,res){ // Requête get du formulaire /mysql
  res.status(200)
  console.log("Connexion en tant qu'admin")
  connection = mysql.createConnection({
    host: "localhost",
    user: "admini", // admini ou techni
    password: "passadm" // passadm ou passtech
  }); // Créée une connexion avec la base de données
  res.redirect('/affich') // Fait une redirection à l'adresse test
}) 

app.get('/conn/techn',function(req,res){ // Requête get du formulaire /mysql
  res.status(200)
  console.log("Connexion en tant que technicien")
  connection = mysql.createConnection({
    host: "localhost",
    user: "techni", // admini ou techni
    password: "passtech" // passadm ou passtech
  }); // Créée une connexion avec la base de données
  res.redirect('/affich') // Fait une redirection à l'adresse test
}) 

app.listen(PORT,() => { // Démarre le serveur en local sur le port PORT
  console.log('\nServeur démarré !')
  console.log('Ouvrez un navigateur et allez l\'adresse suivante :  localhost:' + PORT)
  console.log('Pour arrêter le serveur, faites CTRL+C dans son terminal/invite de commande')
}) 