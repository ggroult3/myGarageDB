const express = require('express') // Framework Express utilisé pour créer le serveur (gestion des différentes routes)
const app = express() // Création du serveur app
const http = require('http')
const server = http.createServer(app)
const mysql = require('mysql') // Middleware mysql permettant la connexion de notre webapp au serveur de la base de données
const ejs = require('ejs') // Middleware permettant le rendu HTML généré de manière dynamique (Embedded JavaScript)
const bodyParser = require('body-parser') // Middleware permettant la gestion des paramètres de formulaire
const session = require('express-session')
var urlecodedParser = bodyParser.urlencoded({extended:false})

const PORT = process.env.PORT || 8080 // Définition du port sur lequel le serveur sera écouté

var nom = "" // Contient le nom de la table à afficher
var result = [] // Contient les résultats de la requête SQL demandé
var result2 = [] // Contient les résultats de la requête SQL demandé
var idvalue = [] // Contient les résultats de la requête SQL demandé

app.use('/',express.static(__dirname + '/assets')) // Permet l'utilisation des fichiers présents de le dossier /assets

app.use(session({
  secret: "s3Cur3",
  cookie:{
    httpOnly:true,
    secure:true
  }
}))

app.get('/',function(req,res){
  res.status(200).render(__dirname + '/assets/index.ejs',{result:result}) // Fait le rendu de l'index.ejs lors d'une requête GET /
}) 

app.get('/affich',function(req,res){
  res.status(200).render(__dirname + '/assets/affich.ejs',{result:result,user:connection.config.user,nomTable:nom}) // Fait le rendu de affich.ejs lors d'une requête GET /affich

}) 

app.get('/ajoutclient',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutclient.ejs',{result:result,result2:result2,idvalue:idvalue}) // Fait le rendu de ajoutclient.ejs lors d'une requête GET /ajoutclient
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.commune", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de ajoutclient.ejs
    console.log(result);
  });
  connection.query("SELECT * FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result2 = data // Stocke les résultats de la requête SQL pour le rendu de ajoutclient.ejs
    console.log(result2);
  });
  connection.query("SELECT MAX(idclient) FROM projet.client", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    idmax = data // Stocke les résultats de la requête SQL pour le rendu de ajoutclient.ejs
	console.log(idmax)
	idmaxobj=JSON.parse(JSON.stringify(idmax)); 
	valueidmax=Object.values(idmaxobj[0])[0] // ID max parmi les clients de la BDD
	if (!valueidmax){ // S'il n'y en n'a pas, la valeur de l'ID du nouveau client sera 
		idvalue=1
    console.log('1')
  }
	else{
	  idvalue=valueidmax+1 // Sinon, ce sera ID max + 1
    console.log('2')
  };
		
  });

}) 

app.get('/ajoutintervention',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutintervention.ejs',{result:result,result2:result2,idvalue:idvalue}) // Fait le rendu de ajoutintervention.ejs lors d'une requête GET /ajoutintervention
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.client", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de ajoutintervention.ejs
    console.log(result);
  });
  connection.query("SELECT * FROM projet.technicien", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result2 = data // Stocke les résultats de la requête SQL pour le rendu de ajoutintervention.ejs
    console.log(result2);
  });
  connection.query("SELECT MAX(idinterv) FROM projet.intervention", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    idmax = data // Stocke les résultats de la requête SQL pour le rendu de ajoutintervention.ejs
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
  res.status(200).render(__dirname + '/assets/ajouttechnicien.ejs',{idvalue:idvalue}) // Fait le rendu de ajouttechnicien.ejs lors d'une requête GET /ajouttechnicien
  console.log('Requête SQL envoyée !')
  connection.query("SELECT MAX(idtechn) FROM projet.technicien", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    idmax = data // Stocke les résultats de la requête SQL pour le rendu de ajouttechnicien.ejs
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
  res.status(200).render(__dirname + '/assets/ajoutarrivee.ejs',{result:result,result2:result2}) // Fait le rendu de ajoutarrivee.ejs lors d'une requête GET /ajoutarrivee
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.intervention", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de ajoutarrivee.ejs
    console.log(result);
  });
  connection.query("SELECT * FROM projet.voiture", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result2 = data // Stocke les résultats de la requête SQL pour le rendu de ajoutarrivee.ejs
    console.log(result2);
  });
}) 

app.get('/ajoutadministrateur',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutadministrateur.ejs',{idvalue:idvalue}) // Fait le rendu de ajoutadministrateur.ejs lors d'une requête GET /ajoutadministrateur
  console.log('Requête SQL envoyée !')
  connection.query("SELECT MAX(idadm) FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    idmax = data // Stocke les résultats de la requête SQL pour le rendu de ajoutadministrateur.ejs
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
  res.status(200).render(__dirname + '/assets/ajoutcommune.ejs',{result:result}) // Fait le rendu de ajoutcommune.ejs lors d'une requête GET /ajoutcommune
  });
  
app.get('/ajoutvoiture',function(req,res){
  res.status(200).render(__dirname + '/assets/ajoutvoiture.ejs',{result:result}) // Fait le rendu de ajoutvoiture.ejs lors d'une requête GET /ajoutvoiture
  });
 
app.post('/update/Client',urlecodedParser,function(req,res){
  res.status(200).render(__dirname + '/assets/modifclient.ejs',{result:result,result2:result2,body:req.body}) // Fait le rendu de modifclient.ejs lors d'une requête GET /update/Client
  console.log(req.body)
  console.log('Requête SQL envoyée !')
  connection.query("SELECT * FROM projet.commune", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result = data // Stocke les résultats de la requête SQL pour le rendu de modifclient.ejs
    console.log(result);
  });
  connection.query("SELECT * FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
    if (err) throw err;
    result2 = data // Stocke les résultats de la requête SQL pour le rendu de modifclient.ejs
    console.log(result2);
  });

}) 


app.post('/mysql/insert/:table',urlecodedParser,function(req,res){
  res.status(200)
  console.log(req.body)
  SQLRequest = "INSERT INTO projet." + req.params.table + " VALUES " // La requête SQL sera une insertion dans la table demandée
  switch (req.params.table) {
    case "client":
      SQLRequest = SQLRequest + "(?,?,?,?,?)"
      SQLvalues = [req.body.idclient,req.body.nom,req.body.prenom,req.body.adresse,req.body.idadmin] // valeurs qui seront insérées
      connection.query(SQLRequest,SQLvalues,function(err,data){
        if (err) throw err;
        console.log("Insertion du nouveau client")
      })

      var nbClients = 9 // initialisation de la variable nbClients
      connection.query("SELECT nb_clients FROM projet.commune WHERE nom=? ",[req.body.adresse],function(err,data){
        if (err) throw err;
        console.log("Selection de nb_clients dans projet.commune")
        console.log(data)
        dataObject = JSON.parse(JSON.stringify(data))
        console.log(dataObject)
        nbClients = dataObject[0].nb_clients + 1 // On calcule le nb de clients de la commune + 1
        console.log("Dans connection.query : " + nbClients)

        connection.query("UPDATE projet.commune SET nb_clients=? WHERE nom=?",[nbClients,req.body.adresse],function(err,data){
          if(err) throw err;
          console.log("Mise à jour de nb_clients dans projet.commune") // Et on insère cette valeur dans la table
        })
      })
      break;
  
    case "commune":
	  connection.query("SELECT COUNT(*) FROM projet.commune WHERE nom=? ",[req.body.nom],function(err,data){
		  if (err) throw err;
			testunicite = data
		  	testuniciteobj=JSON.parse(JSON.stringify(testunicite)); 
			testuniciteval=Object.values(testunicite[0])[0]
			console.log(testuniciteval)
			if (testuniciteval == 0){ 
			// S'il n'existe paz de commune de ce nom dans la BDD, on la rajoute (sinon on ne fait rien)
			  SQLRequest = SQLRequest + "(?,0)"
			  SQLvalues = [req.body.nom]
			  console.log(SQLRequest)
			  console.log(SQLvalues)
			  connection.query(SQLRequest,SQLvalues,function(err,data){
				if (err) throw err;
				console.log("Ajout de commune fait")
			  })
			}
      })
      break;
    
    case "administrateur":
      SQLRequest = SQLRequest + "(?,?,?)"
      SQLvalues = [req.body.idadmin,req.body.nom,req.body.prenom]
      console.log(SQLRequest)
      console.log(SQLvalues)
      connection.query(SQLRequest,SQLvalues,function(err,data){
        if (err) throw err;
        console.log("Ajout d\'administrateur fait")
      })

      break
    case "arrivee_voiture":
		connection.query("SELECT COUNT(*) FROM projet.arrivee_voiture WHERE idinterv=? ",[req.body.idinterv],function(err,data){
		  if (err) throw err;
			testunicite = data
			testuniciteobj=JSON.parse(JSON.stringify(testunicite)); 
			testuniciteval=Object.values(testunicite[0])[0]
			console.log(testuniciteval)
			if (testuniciteval == 0){ 
		// S'il n'existe pas d'arrivée voiture de l'intervention, on la rajoute

			  SQLRequest = SQLRequest + "(?,?,?,?)"
			  SQLvalues = [req.body.idinterv,req.body.immatriculation,req.body.date_arrivee,req.body.kilometrage]
			  console.log(SQLRequest)
			  console.log(SQLvalues)
			  connection.query(SQLRequest,SQLvalues,function(err,data){
				if (err) throw err;
				console.log("Ajout d'arrivée de voiture fait")
			  })
			}
        })

      break
    case "intervention":
      SQLRequest = SQLRequest + "(?,?,?,?,?)"
      SQLvalues = [req.body.idinterv,req.body.type,req.body.idclient,req.body.idtechn,req.body.remarque]
      console.log(SQLRequest)
      console.log(SQLvalues)
      connection.query(SQLRequest,SQLvalues,function(err,data){
        if (err) throw err;
        console.log("Ajout d\'intervention fait")
      })
      var nbVoitures = 9
      connection.query("SELECT nb_voiture_reparees FROM projet.technicien WHERE idtechn=? ",[req.body.idtechn],function(err,data){
        if (err) throw err;
        console.log("Selection de nb_voiture_reparees dans projet.technicien")
        console.log(data)
        dataObject = JSON.parse(JSON.stringify(data))
        console.log(dataObject)
        nbVoitures = dataObject[0].nb_voiture_reparees + 1
        console.log("Dans connection.query : " + nbVoitures)

        connection.query("UPDATE projet.technicien SET nb_voiture_reparees=? WHERE idtechn=?",[nbVoitures,req.body.idtechn],function(err,data){
          if(err) throw err;
          console.log("Mise à jour de nb_clients dans projet.technicien")
        })
      })

      break
    case "technicien":
      SQLRequest = SQLRequest + "(?,?,?,0)"
      SQLvalues = [req.body.idtechn,req.body.nom,req.body.prenom]
      console.log(SQLRequest)
      console.log(SQLvalues)
      connection.query(SQLRequest,SQLvalues,function(err,data){
        if (err) throw err;
        console.log("Ajout de technicien fait")
      })

      break
    case "voiture":
	  connection.query("SELECT COUNT(*) FROM projet.voiture WHERE immatriculation=? ",[req.body.immatriculation],function(err,data){
		  if (err) throw err;
			testunicite = data
			testuniciteobj=JSON.parse(JSON.stringify(testunicite)); 
			testuniciteval=Object.values(testunicite[0])[0]
			console.log(testuniciteval)
			if (testuniciteval == 0){ 
		// S'il n'existe paz de voiture avec cette immatriculation dans la BDD, on la rajoute

			  SQLRequest = SQLRequest + "(?,?,?)"
			  SQLvalues = [req.body.immatriculation,req.body.marque,req.body.type]
			  console.log(SQLRequest)
			  console.log(SQLvalues)
			  connection.query(SQLRequest,SQLvalues,function(err,data){
				if (err) throw err;
				console.log("Ajout de voiture fait")
			  })
			}
      })
      break
  }
  res.redirect("/affich")
})

app.post('/mysql/update/client',urlecodedParser,function(req,res){
  res.status(200)
  console.log(req.body)
  connection.query("SELECT adresse FROM projet.client WHERE idclient=? ",[req.body.idclient],function(err,data){
    if (err) throw err;
    console.log("Selection de l'ancienne adresse du client") //Selection de l'ancienne adresse du client
    console.log(data)
    dataObject = JSON.parse(JSON.stringify(data))
    console.log(dataObject)
    ancienneAdr = dataObject[0].adresse
    console.log("Dans connection.query : " + ancienneAdr)
	
	connection.query("UPDATE projet.client SET nom=?, prenom=?, adresse=?, idadmin=? WHERE idclient = ?",[req.body.nom,req.body.prenom,req.body.adresse,req.body.idadmin,req.body.idclient],function(err,data){
    if (err) throw err;
    console.log("Modification du client")

	if (ancienneAdr != req.body.adresse){
		console.log("Changement d'adresse")
		
		  connection.query("SELECT nb_clients FROM projet.commune WHERE nom=? ",[req.body.adresse],function(err,data){
			if (err) throw err;
			console.log("Selection de nb_clients dans projet.commune") //Selection de nb_clients dans la nouvelle commune
			console.log(data)
			dataObject = JSON.parse(JSON.stringify(data))
			console.log(dataObject)
			nbClients = dataObject[0].nb_clients + 1
			console.log("Dans connection.query : " + nbClients)
			connection.query("UPDATE projet.commune SET nb_clients=? WHERE nom=?",[nbClients,req.body.adresse],function(err,data){
			if(err) throw err;
			console.log("Mise à jour de nb_clients dans projet.commune") // On itère ce nb_clients de 1
			
		  connection.query("SELECT nb_clients FROM projet.commune WHERE nom=? ",[ancienneAdr],function(err,data){
			if (err) throw err;
			console.log("Selection de nb_clients dans projet.commune") //Selection de nb_clients dans l'ancienne commune
			console.log(data)
			dataObject = JSON.parse(JSON.stringify(data))
			console.log(dataObject)
			nbClients = dataObject[0].nb_clients - 1
			console.log("Dans connection.query : " + nbClients)
			connection.query("UPDATE projet.commune SET nb_clients=? WHERE nom=?",[nbClients,ancienneAdr],function(err,data){
			if(err) throw err;
			console.log("Mise à jour de nb_clients dans projet.commune") // On baisse cette valeur de 1
			  })
			  
			  })

		  })
		  
		  })
	}
  
  })
  
  })


  res.redirect("/affich")
})

app.post('/mysql/select/',urlecodedParser,function(req,res){ // Requête POST effectuée à la suite du formulaire de la page affich.ejs. Cette requête a pour de récupérer les données de la table à afficher
  res.status(200)
  console.log(req.body)
  switch (req.body.table){
    case "adm":
      nom = "Administrateur"
      connection.query("SELECT * FROM projet.administrateur", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de affich.ejs
      })
      break
    case "arr":
      nom = "Arrivée voiture"
      connection.query("SELECT * FROM projet.arrivee_voiture", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de affich.ejs
      })
      break
    case "cli":
      nom = "Client"
      connection.query("SELECT * FROM projet.client", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de affich.ejs
      })
      break
    case "com":
      nom = "Commune"
      connection.query("SELECT * FROM projet.commune", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de affich.ejs
      })
      break
    case "int":
      nom = "Intervention"
      connection.query("SELECT * FROM projet.intervention", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de affich.ejs
      })
      break
    case "techn":
      nom = "Technicien"
      connection.query("SELECT * FROM projet.technicien", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de affich.ejs
      })
      break
    case "voi":
      nom = "Voiture"
      connection.query("SELECT * FROM projet.voiture", function (err, data) { // Effectue une requête SQL
        if (err) throw err;
        result = data // Stocke les résultats de la requête SQL pour le rendu de affich.ejs
      })
      break
    case "":
      result=[]
      nom = ""
      break
  }
  res.redirect('/affich') // Fait une redirection à l'adresse affich
}) 

app.post('/choixajout/',urlecodedParser,function(req,res){ // Requête POST qui redirige vers la page d'ajout correspondante
  res.status(200)
  switch (req.body.table){
    case "adm":
	  if (connection.config.user=="techni") { //  Si l'utilisateur est un technicien, il n'a pas le droit d'accéder à cette page
		res.redirect('/affich')
	  } else {
		res.redirect('/ajoutadministrateur')}
      break
    case "arr":
      res.redirect('/ajoutarrivee')
      break
    case "cli":
      res.redirect('/ajoutclient')
      break
    case "com":
      res.redirect('/ajoutcommune')
      break
    case "int":
      res.redirect('/ajoutintervention')
      break
    case "techn":
	  if (connection.config.user=="techni") { //  Si l'utilisateur est un technicien, il n'a pas le droit d'accéder à cette page
		res.redirect('/affich')
	  } else {
        res.redirect('/ajouttechnicien')}
      break
    case "voi":
      res.redirect('/ajoutvoiture')
      break
    case "":
	  res.redirect('/affich')
      break
  }
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

app.get('/quit',function(req,res){ // Ferme la connexion
  connection.end(function(err){
    if (err){
      return console.log('error:'+err.message)
    }
    console.log('Close the database connection.')
	res.redirect('/')
  })
})