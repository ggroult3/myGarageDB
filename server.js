var mysql = require('mysql');
var db = mysql.createConnection({

   host: "localhost",

   user: "admini", // techni

   password: "passadm" // passtech

 });
 
  db.connect(function(err) {

   if (err) throw err;

   console.log("Connecté à la base de données MySQL!");
   
   db.query("SELECT * FROM projet.administrateur", function (err, result) {

       if (err) throw err;

       console.log(result);

     });
 
	 
	

 });