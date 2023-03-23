# REST API example application

Cette API est un serveur web simple écrit en Node.js qui permet de stocker et de manipuler des données dans une base de données en mémoire. L'API utilise des requêtes HTTP pour créer, lire, mettre à jour et supprimer des données.

## Install

    

## Run client

    cd client
    npm install
    npm run start

## Run server

    node server.js

# REST API

The REST API to the example app is described below.

## Get list of database👁‍🗨

### Request

`GET http://localhost:8080`


### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Create a new database➕

### Request

`POST http://localhost:8080`

    {
        "id": "/ynov1",
        "name": "ynov1"
    }

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

     {
        "id": "/ynov1",
        "name": "ynov1"
    }

## Get a specific database👁‍🗨

### Request

`GET http://localhost:8080/nom_database`


### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

     {
        "id": "/ynov1",
        "name":"ynov1",
        "table": [
            {
                "id": 1,
                "name": "users",
                "détail": "/ynov1/users"
            },
            {
                "id": 2,
                "name": "products",
                "détail": "/ynov1/products"
            }
        ]
    }

## Get a table database specific👁‍🗨

### Request

`GET http://localhost:8080/nom_database/nom_table`


### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {
        "id": 1,
        "name": "users",
        "data": [
            {
                "name": "vince",
                "age": 10,
                "id": 1
            },
            {
                "name": "vincea",
                "age": 10,
                "id": 2
            }
        ]
    }
    
## Create data👁‍🗨

### Request

`POST http://localhost:8080/nom_database/nom_table`

    {"name": "melvin", "age": 10, "id": 0}

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"name": "melvin", "age": 10, "id": "/nom_database/nom_table/1"}
    
### Filter by name data

`GET http://localhost:8080/search?name=:data_name`


### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    { "name": "melvin", "age": 10, "id": 0}
    
 ### Modification data

`PUT http://localhost:8080/nom_database/nom_table/data_id`
    
    {"name": "melvin", "age": 10, "id": 0}
    
 > :warning: **Make sure to add the same id of the object**: be careful with the writing so as not to have an error!

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    { "name": "melvin", "age": 10, "id": 0}
    
 ### Delete data

`DELETE http://localhost:8080/nom_database/nom_table/data_id`


### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    

## Create new table➕

### Request

`POST http://localhost:8080/nom_database`

    {"id":"/users","name":"users"}

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/2
    Content-Length: 35

    {"id":"/users","name":"users"}


## Update database🔁

### Request

`PUT http://localhost:8080`

    {"id":1,"name":"bar","table":[]}
    
 > :warning: **Make sure to add the same id of the object**: be careful with the writing so as not to have an error!

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"id":1,"name":"bar","table":[]}


## Update table🔁

### Request

`PUT http://localhost:8080/nom_databse`


### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"product2","data[]}


## Delete a Thing🗑

### Request

`DELETE http://localhost:8080/nom_database`

### Response

    HTTP/1.1 200 
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    
    "BDD supprimé"
    


## Delete table🗑

### Request

`DELETE http://localhost:8080/nom_database/nom_table`


### Response

    HTTP/1.1 200 
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK

    []

