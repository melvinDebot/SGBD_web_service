# TP WEB SERVICE

# Structure de donnée + API 

1. / 
2. /nombdd 
3. /nombdd/table 
4. /nombdd/table?nomduchamp=valeur&nomduchamp=valeur 
5. /nombdd/table/{$id}


GET
1 montre la liste des BDD sinon tableau vide :
["Ynov" ,"Ynov1"]
2 affiche la bdd avec ses tables:

  {
      [
        "user",
	"produit"
  	]
  }
3 affiche la table avec sa list des élément: 
[
          {
		"id":
            "name" : "Jean",
            "age" : 25
          },
          {
	"id":
            "name" : "Pierre",
            "age" : 26
          },
	 {
		"id":
            "name" : "Jean",
            "age" : 25
          }
        
        ],
	"produits": [
		
]

4 recherche des élément qui sont en paramètre
[
  {
    "Ynov1" : [
      {
        "user" : [
          {
            "name" : "Jean",
            "age" : 25
          },
          {
            "name" : "Pierre",
            "age" : 26
          }
        
        ]
      }
    ]
  }
]

POST
1 créer une BDD
body : { "name":"nomBDD" }
2 créer une Table de la BDD
body : { "name":"nomtable" }
3 créer les champs de la table de la BDD
body : { "name":["nomdechamp","champ1","champ2"] }

PUT
2 renommage de la bdd
3 renommage de la table
4 renommage du champ de la table

Delete
2 supprime la bdd
3 supprime la table
4 supprime le champ de la table