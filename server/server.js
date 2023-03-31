const http = require("http")
const url = require("url")
const fs = require("fs")

const PORT = 8080

let database = []

function saveData() {
    fs.writeFile("data.json", JSON.stringify(database), (err) => {
        if (err) throw err
        console.log("Les données ont été sauvegardées dans le fichier data.json")
    })
}

fs.readFile("data.json", (err, data) => {
    if (err) throw err
    if (data.length > 0) {
        database = JSON.parse(data)
    } else {
        database = []
    }
})

function checkDoublon(e) {
    for (let i = 0; i < e.length; i++) {
        for (let j = i + 1; j < e.length; j++) {
            if (JSON.stringify(e[i].id) === JSON.stringify(e[j].id)) {
                e.splice(j, 1)
                j--
            }
        }
    }
}

// Création d'une database
const handlePost = (req, res) => {
    let body = ""
    req.on("data", (chunk) => {
        body += chunk.toString()
    })
    req.on("end", () => {
        const newEntry = JSON.parse(body)
        const expectedBody = {
            id: "id",
            name: "nom de la BDD",
            table: [],
        }
        if (
            JSON.stringify(Object.keys(newEntry)) ===
            JSON.stringify(Object.keys(expectedBody))
        ) {
            database.push(newEntry)
            checkDoublon(database)
            res.writeHead(201, { "Content-Type": "application/json" })
            const successMessage = {
                success: {
                    code: 201,
                    message: `Votre base ${newEntry.name} a été créer`,
                },
            }
            res.end(JSON.stringify(successMessage))
        } else {
            res.writeHead(400, { "Content-Type": "application/json" })
            const errorMessage = {
                error: {
                    code: 400,
                    message: "Le format du body est invalide.",
                    format: expectedBody,
                },
            }
            res.end(JSON.stringify(errorMessage))
        }
    })
}
// Création d'une table
const handlePostTable = (req, res) => {
    let body = ""
    req.on("data", (chunk) => {
        body += chunk.toString()
    })
    req.on("end", () => {
        let path = req.url.replace("/", "")
        const newEntry = JSON.parse(body)
        const expectedBody = { id: 1, name: "users", data: [] }
        for (let i = 0; i < database.length; i++) {
            if (database[i].name === path) {
                if (
                    JSON.stringify(Object.keys(newEntry)) ===
                    JSON.stringify(Object.keys(expectedBody))
                ) {
                    database[i].table.push(newEntry)
                    checkDoublon(database[i].table)
                    res.writeHead(201, { "Content-Type": "application/json" })
                    const successMessage = {
                        success: {
                            code: 201,
                            message: `Votre base ${newEntry.name} a été créer`,
                        },
                    }
                    res.end(JSON.stringify(successMessage))
                } else {
                    res.writeHead(400, { "Content-Type": "application/json" })
                    const errorMessage = {
                        error: {
                            code: 400,
                            message: "Le format du body est invalide.",
                            format: expectedBody,
                        },
                    }
                    res.end(JSON.stringify(errorMessage))
                }
                break
            }
        }
    })
}

// Recherche d'un élément dans un tableau
function findStringInArray(arr, str) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === str) {
            return arr[i].name
        }
    }
    return null
}
// Suppression d'un élément dans un tableau
function deleteObject(tableau, chaineRecherche) {
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].id === chaineRecherche) {
            tableau.splice(i, 1)
            return true
        }
    }
    return false
}
// Split d'une url
function splitUrl(url) {
    const segments = url.split("/")
    return segments.filter((segment) => segment !== "")
}

// Recherche d'un élément dans un tableau par le nom
function filtrerObjetParNom(tableau, nomObjet) {
    const nouveauTableau = {
        id: tableau.id,
        name: tableau.name,
        data: tableau.data.filter((objet) => objet.name === nomObjet),
    }
    return nouveauTableau
}

// Stocker l'ID du timer dans une variable
setInterval(saveData, 300000)

// Crée le serveur web
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true) // true sets the query property of parsedUrl to an object
    const query = parsedUrl.query
    // Ajoute les en-têtes CORS
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.setHeader("Access-Control-Allow-Credentials", true)

    let path_database = findStringInArray(database, req.url.replace("/", ""))

    if (req.method === "OPTIONS") {
        // Répond avec les en-têtes CORS appropriés pour les requêtes OPTIONS
        res.writeHead(200)
        res.end()
    } else if (req.method === "PUT") {
        const jsonMessage = {
            error: {
                code: 405,
                message: "Méthode PUT non autorisée pour cette ressource.",
            },
        }
        res.writeHead(405, { "Content-Type": "application/json" })
        res.end(JSON.stringify(jsonMessage))
        //création de la bdd
    } else if (req.method === "POST" && req.url === "/") {
        handlePost(req, res)

        //affichage la list des BDD
    } else if (req.method === "GET" && req.url === "/") {
        console.log(database)
        fs.readFile("data.json", "utf8", (err, data) => {
            if (err) throw err
            // Vérifier si le fichier est vide
            if (data.trim.length <= 0) {
                const maskedData = JSON.stringify(database, (key, value) =>
                    key === "table" ? undefined : value
                )
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                res.end(maskedData)
            } else {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                // database = data
                // console.log(database)
                res.end(data)
            }
        })
    } else if (
        req.method === "DELETE" && //suppression de la BDD
        path_database
    ) {
        deleteObject(database, req.url)
        const jsonMessage = {
            success: {
                code: 200,
                message: `Votre BDD ${path_database} a été supprimé`
            },
        }
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(jsonMessage))
        //affichage la liste des tables
    } else if (req.method === "GET" && path_database) {
        let result = database.find((item) => item.name === path_database)
        const maskedData = JSON.stringify(result, (key, value) =>
            key === "data" ? undefined : value
        )
        if (result) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(maskedData)
        }
        // création de la table
    } else if (req.method === "POST" && path_database) {
        handlePostTable(req, res) // fonction qui crée la table
    }

    // GET TABLE /:database/:table or /:database/:table?name=xxx
    else if (req.method === "GET" && req.url) {
        const segments = splitUrl(req.url)
        var q = url.parse(req.url, true).query
        console.log(q)
        if (Object.keys(q).length !== 0) {
            for (let i = 0; i < database.length; i++) {
                for (let j = 0; j < database[i].table.length; j++) {
                    console.log(filtrerObjetParNom(database[i].table[j], q.name))

                    let result = filtrerObjetParNom(database[i].table[j], q.name)
                    if (result !== null) {
                        res.statusCode = 200
                        res.setHeader("Content-Type", "application/json")
                        res.end(
                            JSON.stringify(
                                filtrerObjetParNom(database[i].table[j], q.name)
                            )
                        )
                        break
                    } else {
                        res.statusCode = 404
                        res.setHeader("Content-Type", "application/json")
                        res.end(JSON.stringify({ message: "Not found" }))
                    }
                }
            }
        } else {
            if (segments.length <= 2) {
                for (let i = 0; i < database.length; i++) {
                    for (let j = 0; j < database[i].table.length; j++) {
                        if (database[i].table[j].id === `/${segments[1]}`) {
                            res.statusCode = 200
                            res.setHeader("Content-Type", "application/json")
                            res.end(JSON.stringify(database[i].table[j]))
                        } 
                        break
                    }
                }
            }
        }
    }
    // POST DATA /:database/:table
    else if (req.method === "POST" && req.url) {
        const segments = splitUrl(req.url)
        let body = ""
        req.on("data", (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            const data = JSON.parse(body)
            for (let i = 0; i < database.length; i++) {
                for (let j = 0; j < database[i].table.length; j++) {
                    if (database[i].table[j].name === segments[1]) {
                        if (database[i].table[j].data.id) {
                            console.log(database[i].table[j].data)
                        }
                        database[i].table[j].data.push(data)
                        checkDoublon(database[i].table[j].data)
                        res.writeHead(201, { "Content-Type": "application/json" })
                        const successMessage = {
                            success: {
                                code: 201,
                                message: "Vos données ont été ajouté",
                                data: database[i].table[j].data.length,
                            },
                        }
                        res.end(JSON.stringify(successMessage))
                        break
                    }
                }
            }
        })
    }
    // DELETE TABLE /ynov/users
    else if (req.method === "DELETE" && req.url) {
        const segments = splitUrl(req.url)
        if (segments.length <= 2) {
            for (let i = 0; i < database.length; i++) {
                for (let j = 0; j < database[i].table.length; j++) {
                    if (database[i].table[j].name === segments[1]) {
                        console.log(database[i].table[j].name, segments[1])
                        deleteObject(database[i].table, `/${segments[1]}`)
                        const jsonMessage = {
                            success: {
                                code: 200,
                                message: `Votre table ${segments[1]} a été supprimé`
                            },
                        }
                        res.writeHead(200, { "Content-Type": "application/json" })
                        res.end(JSON.stringify(jsonMessage))
                        break
                    }
                }
                break
            }
        } else if (segments.length >= 3) {
            // DELETE DATA /ynov/users/:name
            for (let i = 0; i < database.length; i++) {
                for (let j = 0; j < database[i].table.length; j++) {
                    if (database[i].table[j].name === segments[1]) {
                        for (let k = 0; k < database[i].table[j].data.length; k++) {
                            if (database[i].table[j].data[k].name === segments[2]) {
                                deleteObject(database[i].table[j].data, `/${segments[2]}`)
                                const jsonMessage = {
                                    success: {
                                        code: 200,
                                        message: `Votre data a été supprimé`,
                                        data : database[i].table[j].data
                                    },
                                }
                                res.writeHead(200, { "Content-Type": "application/json" })
                                res.end(JSON.stringify(jsonMessage))
                                break
                            }
                        }
                    }
                }
            }
        }
    }

    // url API pas bon
    else {
        console.log(req.url)
        const jsonMessage = {
            error: {
                code: 404,
                message: `Le chemin ${req.url} n'existe pas.`,
            },
        }
        res.writeHead(404, { "Content-Type": "application/json" })
        res.end(JSON.stringify(jsonMessage))
    }
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})