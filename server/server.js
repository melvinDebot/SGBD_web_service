const http = require('http');

class InMemoryDatabase {
    constructor() {
      this.data = [];
    }
  
    // Ajoute un objet à la base de données
    add(object) {
      this.data.push(object);
    }
  
    // Met à jour un objet dans la base de données
    update(id, object) {
      const index = this.findIndexById(id);
      if (index !== -1) {
        this.data[index] = Object.assign(this.data[index], object);
      }
    }
  
    // Supprime un objet de la base de données
    delete(id) {
      const index = this.findIndexById(id);
      if (index !== -1) {
        this.data.splice(index, 1);
      }
    }
  
    // Récupère tous les objets dans la base de données
    getAll() {
      return this.data;
    }
  
    // Récupère un objet de la base de données par son ID
    getById(id) {
      const index = this.findIndexById(id);
      if (index !== -1) {
        return this.data[index];
      }
    }
  
    // Recherche tous les objets dans la base de données qui correspondent à un filtre
    search(filter) {
      return this.data.filter(object => {
        for (const key in filter) {
          if (filter[key] !== object[key]) {
            return false;
          }
        }
        return true;
      });
    }
  
    // Trouve l'index d'un objet dans la base de données par son ID
    findIndexById(id) {
      return this.data.findIndex(object => object.id === id);
    }
  }

// Crée une instance de la base de données
const db = new InMemoryDatabase();

// Crée le serveur web
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      // Retourne tous les objets dans la base de données en format JSON
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(db.getAll()));
      res.end();
    } else if (req.method === 'GET' && req.url.startsWith('/object/')) {
      // Récupère un objet par son ID en format JSON
      const id = parseInt(req.url.split('/')[2]);
      const object = db.getById(id);
      if (object) {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(object));
      } else {
        res.statusCode = 404;
      }
      res.end();
    } else if (req.method === 'POST' && req.url === '/') {
      // Ajoute un nouvel objet à la base de données
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        try {
          const object = JSON.parse(data);
          const id = db.add(object);
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Location', `/object/${id}`);
          res.statusCode = 201;
          res.write(JSON.stringify({ id }));
        } catch (err) {
          res.statusCode = 400;
        }
        res.end();
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  });

// Lance le serveur web sur le port 8080
server.listen(8080, () => {
  console.log('Serveur web lancé sur le port 8080');
});
