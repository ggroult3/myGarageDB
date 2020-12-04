# myGarageDB
Ce projet est une application du cours MOD 4.6 "Système de base de données" de l'Ecole Centrale de Lyon

## Importer la BDD sur MySQL
1. Ouvrir MySQL Workbench
2. Rejoindre une connection (par exemple local instance)
3. Si le serveur MySQL est arrêté, le démarrer dans *Server/ Startup/Shutdown* 
4. Aller dans *Server/Data Import/Import from Self-contained File* et sélectionner le fichier .sql
5. Dans *Default Schema to be Imported to*, appuyer sur *New...*, et appeller le schéma **projet**
6. Aller dans *Import Progress* et *Start Import*
7. Pour vérifier que l'import s'est bien réalisé, aller dans *Server/Users and Privileges* et vérifier la présence de deux nouvels utilisateurs, admini et techni

## Installation de NodeJS
Télécharger NodeJS sur https://nodejs.org/en/download/

## Installation des modules
Dans le dossier téléchargé, exécuter la commande *npm install* via une invite de commande (donc après avoir fait *cd {emplacement du dossier}*

## Lancement du serveur
Dans l'invite de commande (toujours dans le même dossier), taper *node server.js*
Dans un navigateur, taper l'URL indiquée sur la console (normalement localhost:8080)

Pour arrêter le serveur, taper CTRL+C dans l'invite de commande