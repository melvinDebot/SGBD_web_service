const http = require("http");

const PORT = 8080;

const database = [];

const handlePost = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newEntry = JSON.parse(body);
    database.push(newEntry);
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(newEntry));
  });
};

const handlePostTable = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let path = req.url.replace("/", "");
    const newEntry = JSON.parse(body);
    for (let i = 0; i < database.length; i++) {
      if (database[i].name === path) {
        database[i].table.push(newEntry);
      } else {
        console.log("PATH NOT FOUND", database[i][path]);
      }
    }
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(newEntry));
  });
};

const handlePutTable = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let path = req.url.replace("/", "");
    const updatedEntry = JSON.parse(body);
    let found = false;
    for (let i = 0; i < database.length; i++) {
      if (database[i].name === path) {
        for (let j = 0; j < database[i].table.length; j++) {
          if (database[i].table[j].id === updatedEntry.id) {
            database[i].table[j] = updatedEntry;
            found = true;
            break;
          }
        }
        break;
      }
    }
    if (found) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(updatedEntry));
      //
    } else {
      res.statusCode = 400;
      res.end("Bad request");
    }
  });
};

const handlePutDatabase = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let path = req.url.replace("/", "");
    const updatedEntry = JSON.parse(body);
    let found = true;
    for (let i = 0; i < database.length; i++) {
      if (database[i].id === updatedEntry.id) {
        database[i] = updatedEntry;
        found = true;
        break;
      }
    }
    if (found) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(updatedEntry));
      //
    } else {
      res.statusCode = 400;
      res.end("Bad request");
    }
  });
};

function findStringInArray(arr, str) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === str) {
      return arr[i].name;
    }
  }
  return null;
}

function deleteObject(tableau, chaineRecherche) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i].name === chaineRecherche) {
      tableau.splice(i, 1);
      return true;
    }
  }
  return false;
}

function splitUrl(url) {
  const segments = url.split("/");
  return segments.filter((segment) => segment !== "");
}

// Crée le serveur web
const server = http.createServer((req, res) => {
  // Ajoute les en-têtes CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  let path_database = findStringInArray(database, req.url.replace("/", ""));

  if (req.method === "OPTIONS") {
    // Répond avec les en-têtes CORS appropriés pour les requêtes OPTIONS
    res.writeHead(200);
    res.end();
    //création de la bdd
  } else if (req.method === "POST" && req.url === "/") {
    handlePost(req, res);

    //affichage la list des BDD
  } else if (req.method === "PUT" && req.url === "/") {
    handlePutDatabase(req, res);

    //affichage la list des BDD
  } else if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(database));
  } else if (
    req.method === "DELETE" && //suppression de la BDD
    path_database
  ) {
    deleteObject(database, path_database);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`BDD suprimmé`);

    //affichage la liste des tables
  } else if (req.method === "GET" && path_database) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].name === path_database) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(database[i].table));
        break;
      } else {
        res.statusCode = 404;
        res.end("Not found");
      }
    }

    // création de la table
  } else if (req.method === "PUT" && path_database) {
    handlePutTable(req, res);
  } else if (req.method === "POST" && path_database) {
    handlePostTable(req, res); // fonction qui crée la table
  } else if (req.method === "GET" && path_database) {
    // fonction qui vérifie l'objet
    database.map((item) => {
      if (Object.keys(item)[0] === req.url.replace("/", "")) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(item));
      }
    });
    // création de la table
  }
  // GET TABLE /ynov/users
  else if (req.method === "GET" && req.url) {
    const segments = splitUrl(req.url);
    for (let i = 0; i < database.length; i++) {
      for (let j = 0; j < database[i].table.length; j++) {
        if (database[i].table[j].name === segments[1]) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(database[i].table[j].data));
        } else {
          res.statusCode = 400;
          res.setHeader("Content-Type", "text/plain");
          res.end(`Bad request `);
        }
        break;
      }
    }
  }
  // DELETE TABLE /ynov/users
  else if (req.method === "DELETE" && req.url) {
    const segments = splitUrl(req.url);
    for (let i = 0; i < database.length; i++) {
      for (let j = 0; j < database[i].table.length; j++) {
        if (database[i].table[j].name === segments[1]) {
          deleteObject(database[i].table, segments[1]);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(database[i].table));
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain");
          res.end(`Route not found`);
        }
        break;
      }
      break;
    }
  }
  // url API pas bon
  else {
    console.log(path_database);
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
