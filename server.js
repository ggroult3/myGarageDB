const express = require('express') // Middleware Express utilisé pour créer le serveur (gestion des différentes routes)
const app = express() // Création du serveur app
const http = require('http')
const server = http.createServer(app)
const mysql = require('mysql') // Module mysql permettant la connexion de notre webapp au serveur de la base de données
const ejs = require('ejs') // Module permettant le rendu HTML généré de manière dynamique (Embedded JavaScript)
const bodyParser = require('body-parser') // Module permettant la gestion des paramètres de formulaire
var urlecodedParser = bodyParser.urlencoded({extended:false})

const PORT = process.env.PORT || 8080 // Définition du port sur lequel le serveur sera écouté

var nom = "" // Contient le nom de la table à afficher
var result = [] // Contient les résultats de la requête SQL demandé
var result2 = [] // Contient les résultats de la requête SQL demandé
var idvalue = [] // Contient les résultats de la requête SQL demandé



app.use('/',express.static(__dirname + '/assets')) // Permet l'utilisation des fichiers présents de le dossier /assets

app.get('/',function(req,res){
  res.status(200).render(__dirname + '/assets/index.ejs',{result:result}) // Fait le rendu de l'index.ejs lors d'une requête GET /
}) 

app.get('/affich',function(req,res){
  res.status(200).render(__dirname + '/assets/affich.ejs',{result:result,user:connection.config.user,nomTable:nom}) // Fait le rendu de techn.ejs lors d'une requête GET /

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

app.get('/ajoutintervention',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutintervention.ejs',{result:result,result2:result2,idvalue:idvalue}) // Fait le rendu de techn.ejs lors d'une requête GET /
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.client", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result);
  });
  connection.query("SELECT * FROM projet.technicien", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result2 = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result2);
  });
  connection.query("SELECT MAX(idinterv) FROM projet.intervention", function (err, data) { // Effectue une requête SQL
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


app.get('/ajouttechnicien',function(req,res){
  res.status(200).render(__dirname + '/assets/ajouttechnicien.ejs',{idvalue:idvalue}) // Fait le rendu de techn.ejs lors d'une requête GET /
  console.log('Requête SQL envoyée !')
  connection.query("SELECT MAX(idtechn) FROM projet.technicien", function (err, data) { // Effectue une requête SQL
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

app.get('/ajoutarrivee',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutarrivee.ejs',{result:result,result2:result2}) // Fait le rendu de techn.ejs lors d'une requête GET /
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.intervention", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result);
  });
  connection.query("SELECT * FROM projet.voiture", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result2 = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
    console.log(result2);
  });
}) 

app.get('/ajoutadministrateur',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutadministrateur.ejs',{idvalue:idvalue}) // Fait le rendu de techn.ejs lors d'une requête GET /
  console.log('Requête SQL envoyée !')
  connection.query("SELECT MAX(idadm) FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
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

app.get('/ajoutcommune',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutcommune.ejs',{result:result}) // Fait le rendu de techn.ejs lors d'une requête GET /
  });
  
app.get('/ajoutvoiture',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutvoiture.ejs',{result:result}) // Fait le rendu de techn.ejs lors d'une requête GET /
  });
 




app.post('/mysql/select/',urlecodedParser,function(req,res){ // Requête POST du formulaire /mysql
  res.status(200)
  switch (req.body.table){
    case "adm":
      nom = "Administrateur"
      connection.query("SELECT * FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
      })
      break
    case "arr":
      nom = "Arrivée voiture"
      connection.query("SELECT * FROM projet.arrivee_voiture", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
      })
      break
    case "cli":
      nom = "Client"
      connection.query("SELECT * FROM projet.client", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
      })
      break
    case "com":
      nom = "Commune"
      connection.query("SELECT * FROM projet.commune", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
      })
      break
    case "int":
      nom = "Intervenant"
      connection.query("SELECT * FROM projet.intervention", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
      })
      break
    case "techn":
      nom = "Technicien"
      connection.query("SELECT * FROM projet.technicien", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
      })
      break
    case "voi":
      nom = "Voiture"
      connection.query("SELECT * FROM projet.voiture", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de index.ejs
      })
      break
    case "":
      result=[]
      nom = ""
      break
  }
  res.redirect('/affich') // Fait une redirection à l'adresse test
}) 

app.get('/conn/:user',function(req,res){
  res.status(200)
  switch (req.params.user){
    case "admi":
      strUser = "admini"
      strPass = "passadm"
      break
    case "techn":
      strUser = "techni"
      strPass = "passtech"
      break
  }
  connection = mysql.createConnection({
    host: "localhost",
    user: strUser, // admini ou techni
    password: strPass // passadm ou passtech
  }); // Créée une connexion avec la base de données
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!")
  })
  res.redirect('/affich')
})

server.listen(PORT,() => { // Démarre le serveur en local sur le port PORT
  console.log('\nServeur démarré !')
  console.log('Ouvrez un navigateur et allez l\'adresse suivante :  localhost:' + PORT)
  console.log('Pour arrêter le serveur, faites CTRL+C dans son terminal/invite de commande')
})

app.get('/quit',function(req,res){
  connection.end(function(err){
    if (err){
      return console.log('error:'+err.message)
    }
    console.log('Close the database connection.')
  })
})