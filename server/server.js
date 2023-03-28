const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 8080;

let database = [];

function saveData() {
  fs.writeFile("data.json", JSON.stringify(database), (err) => {
    if (err) throw err;
    console.log("Les données ont été sauvegardées dans le fichier data.json");
  });
}

fs.readFile("data.json", (err, data) => {
  if (err) throw err;
  if (data.length > 0) {
    database = JSON.parse(data);
  } else {
    database = [];
  }
});

function checkDoublon(e) {
  for (let i = 0; i < e.length; i++) {
    for (let j = i + 1; j < e.length; j++) {
      if (JSON.stringify(e[i].id) === JSON.stringify(e[j].id)) {
        e.splice(j, 1);
        j--;
      }
    }
  }
}

// Création d'une database
const handlePost = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newEntry = JSON.parse(body);
    const expectedBody = {
      id: "id",
      name: "nom de la BDD",
      table: [],
    };
    if (
      JSON.stringify(Object.keys(newEntry)) ===
      JSON.stringify(Object.keys(expectedBody))
    ) {
      database.push(newEntry);
      checkDoublon(database);
      res.statusCode = 201;
      res.setHeader("Content-Type", "text/plain");
      res.end(`Votre base "${newEntry.name}" a été créer`);
    } else {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      const errorMessage = {
        message: "Le format du body est invalide.",
        format: expectedBody,
      };
      res.end(JSON.stringify(errorMessage));
    }
  });
};
// Création d'une table
const handlePostTable = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let path = req.url.replace("/", "");
    const newEntry = JSON.parse(body);
    const expectedBody = { id: 1, name: "users", data: [] };
    for (let i = 0; i < database.length; i++) {
      if (database[i].name === path) {
        if (
          JSON.stringify(Object.keys(newEntry)) ===
          JSON.stringify(Object.keys(expectedBody))
        ) {
          database[i].table.push(newEntry);
          checkDoublon(database[i].table);
          res.statusCode = 201;
          res.setHeader("Content-Type", "text/plain");
          res.end(`Votre base "${newEntry.name}" a été créer`);
        } else {
          res.statusCode = 401;
          res.setHeader("Content-Type", "application/json");
          const errorMessage = {
            message: "Le format du body est invalide.",
            format: expectedBody,
          };
          res.end(JSON.stringify(errorMessage));
        }
        break;
      }
    }
  });
};
// Modification d'une table
const handlePutTable = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const updatedEntry = JSON.parse(body);
    let found = false;
    for (let i = 0; i < database.length; i++) {
      for (let j = 0; j < database[i].table.length; j++) {
        const index = req.url.indexOf(database.id);
        if (index !== -1) {
          database[i].table[j].name = updatedEntry.name;
          database[i].table[j].id = updatedEntry.id;
          found = true;
        }
        break;
      }
      break;
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
// Modification d'une database
const handlePutDatabase = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const updatedEntry = JSON.parse(body);
    let found = true;
    for (let i = 0; i < database.length; i++) {
      if (database[i].id === updatedEntry.id) {
        database[i].name = updatedEntry.name;
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
// Recherche d'un élément dans un tableau
function findStringInArray(arr, str) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === str) {
      return arr[i].name;
    }
  }
  return null;
}
// Suppression d'un élément dans un tableau
function deleteObject(tableau, chaineRecherche) {
  for (let i = 0; i < tableau.length; i++) {
    if (tableau[i].id === chaineRecherche) {
      tableau.splice(i, 1);
      return true;
    }
  }
  return false;
}
// Split d'une url
function splitUrl(url) {
  const segments = url.split("/");
  return segments.filter((segment) => segment !== "");
}

// Recherche d'un élément dans un tableau par le nom
function findObjectByName(arr, name) {
  for (let obj of arr) {
    for (let table of obj.table) {
      for (let data of table.data) {
        if (data.name === name) {
          return data;
        }
      }
    }
  }
  return null;
}

// Stocker l'ID du timer dans une variable
setInterval(saveData, 300000);

// Crée le serveur web
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // true sets the query property of parsedUrl to an object
  const query = parsedUrl.query;
  // Ajoute les en-têtes CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
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
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) throw err;
      // Vérifier si le fichier est vide
      if (data.trim.length <= 0) {
        const maskedData = JSON.stringify(database, (key, value) =>
          key === "table" ? undefined : value
        );
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(maskedData);
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      }
    });
  } else if (
    req.method === "DELETE" && //suppression de la BDD
    path_database
  ) {
    deleteObject(database, req.url);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`BDD suprimmé`);

    //affichage la liste des tables
  } else if (req.method === "GET" && path_database) {
    let result = database.find((item) => item.name === path_database);
    const maskedData = JSON.stringify(result, (key, value) =>
      key === "data" ? undefined : value
    );
    if (result) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(maskedData);
    }

    // création de la table
  } else if (req.method === "PUT" && path_database) {
    handlePutTable(req, res);
  } else if (req.method === "POST" && path_database) {
    handlePostTable(req, res); // fonction qui crée la table
  }

  // GET TABLE /:database/:table
  else if (req.method === "GET" && req.url) {
    const segments = splitUrl(req.url);
    if (req.url.startsWith("/search")) {
      const result = findObjectByName(database, query.name);
      if (result !== null) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(result));
      }
    } else {
      if (segments.length <= 2) {
        for (let i = 0; i < database.length; i++) {
          for (let j = 0; j < database[i].table.length; j++) {
            if (database[i].table[j].id === `/${segments[1]}`) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(database[i].table[j]));
            } else {
              res.statusCode = 400;
              res.setHeader("Content-Type", "text/plain");
              res.end(`Bad request  for table ${req.url}`);
            }
            break;
          }
        }
      }
    }
  }
  // POST DATA /:database/:table
  else if (req.method === "POST" && req.url) {
    const segments = splitUrl(req.url);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      for (let i = 0; i < database.length; i++) {
        for (let j = 0; j < database[i].table.length; j++) {
          if (database[i].table[j].name === segments[1]) {
            if (database[i].table[j].data.id) {
              console.log(database[i].table[j].data);
            }
            database[i].table[j].data.push(data);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(database[i].table[j].data));
            break;
          }
        }
      }
    });
  }
  // DELETE TABLE /ynov/users
  else if (req.method === "DELETE" && req.url) {
    const segments = splitUrl(req.url);
    if (segments.length <= 2) {
      for (let i = 0; i < database.length; i++) {
        for (let j = 0; j < database[i].table.length; j++) {
          if (database[i].table[j].name === segments[1]) {
            deleteObject(database[i].table, `/${segments[1]}`);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(database[i].table));
          } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end(`path not found ${req.url}`);
          }
          break;
        }
        break;
      }
    } else if (segments.length >= 3) {
      // DELETE DATA /ynov/users/:name
      for (let i = 0; i < database.length; i++) {
        for (let j = 0; j < database[i].table.length; j++) {
          if (database[i].table[j].name === segments[1]) {
            for (let k = 0; k < database[i].table[j].data.length; k++) {
              if (database[i].table[j].data[k].name === segments[2]) {
                deleteObject(database[i].table[j].data, `/${segments[2]}`);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(database[i].table[j].data));
              }
              break;
            }
          }
        }
        break;
      }
    }
  }

  // PUT DATA /:database/:table/:id
  else if (req.method === "PUT" && req.url) {
    const segments = splitUrl(req.url);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      for (let i = 0; i < database.length; i++) {
        for (let j = 0; j < database[i].table.length; j++) {
          if (database[i].table[j].name === segments[1]) {
            for (let k = 0; k < database[i].table[j].data.length; k++) {
              if (database[i].table[j].data[k].id.toString() === segments[2]) {
                database[i].table[j].data[k] = data;
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(database[i].table[j].data[k]));
                break;
              } else {
                res.statusCode = 400;
                res.setHeader("Content-Type", "text/plain");
                res.end(
                  `the server cannot or will not process the request due to something that is perceived to be a client error `
                );
                break;
              }
            }
          } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end(`path not found ${req.url}`);
          }
          break;
        }
      }
    });
  }

  // url API pas bon
  else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// // Arrêter le serveur après 5 secondes
// setTimeout(() => {
//   server.close();
// }, 10000);

// // Vérifier si le serveur est arrêté
// server.on('close', () => {
//   //clearInterval(timerId);
//   console.log('Le serveur est arrêté');
// });
