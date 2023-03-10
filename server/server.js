const http = require('http');

const PORT = 3000;

const database = [];
const tables = [];
const elements = {};

const handlePost = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newEntry = JSON.parse(body);
    database.push(Object.keys(newEntry)[0]);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newEntry));
  });
};

const handlePostTable = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newEntry = JSON.parse(body);
    tables.push(Object.keys(newEntry)[0]);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newEntry));
  });
};

function findStringInArray(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === str) {
      return arr[i];
    }
  }
  return null;
}


// Crée le serveur web
const server = http.createServer((req, res) => {
   // Ajoute les en-têtes CORS
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   res.setHeader('Access-Control-Allow-Credentials', true);
 
   if (req.method === 'OPTIONS') {
     // Répond avec les en-têtes CORS appropriés pour les requêtes OPTIONS
     res.writeHead(200);
     res.end();
     //création de la bdd
   } else if (req.method === 'POST' && req.url === '/') {
     handlePost(req, res);
 
   //affichage la list des BDD
   } else if (req.method === 'GET' && req.url === '/') {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.end(JSON.stringify(database));
 
   }  else if(req.method === 'DELETE' && findStringInArray(req.url.replace("/", ""), database)){
     const index = database.indexOf(findStringInArray(req.url.replace("/", ""), database));
       if (index !== -1){
       database.splice(index, 1);
       res.writeHead(200, { 'Content-Type': 'text/plain' });
       res.end(`BDD suprimmé`);
       } else {
         res.writeHead(404, { 'Content-Type': 'text/plain' });
         res.end(`La chaîne de caractères n'a pas été trouvée dans le tableau.`);
       }
 
 
   //affichage la liste des tables
   } else if(req.method === 'GET' && findStringInArray(req.url.replace("/", ""), database)){
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json' );
     res.end(JSON.stringify(tables));
 
   // création de la table
   } else if(req.method === 'POST' && findStringInArray(req.url.replace("/", ""), database)){
     handlePostTable(req, res);
     
   // url API pas bon
   } else {
     res.statusCode = 404;
     res.end();
   }
 });
 
 server.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
 });