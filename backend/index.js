//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
//importo el fichero items.js que está en la carpeta services
const items = require('./services/items')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Hola Mundo!'})
})

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

// Creación del endpoint: addItem
// Llama al fichero items.js usando el método insertData pasándole
// los datos de la tabla coleccion (los cuales ya se encuentran contenidos en el argumento "req")
app.get('/addItem', async function(req, res, next) {
    try {
    res.json(await items.insertData(req, res))
    } catch (err) {
    console.error(`Error while inserting items `, err.message);
    next(err);
    }
})

// Creación del endpoint: getItems
// Llama al fichero items.js usando el método getData
app.get('/getItems', async function(req, res, next) {
    try {
    res.json(await items.getData(req, res))
    } catch (err) {
    console.error(`Error while getting items `, err.message);
    next(err);
    }
})

// Creación del endpoint: deleteItem
// Llama al fichero items.js usando el método deleteData pasándole
// la id de la tabla coleccion (la cual ya se encuentra contenida en el argumento "req")
app.get('/deleteItem', async function(req, res, next) {
    try {
    res.json(await items.deleteData(req, res))
    } catch (err) {
    console.error(`Error while deleting items `, err.message);
    next(err);
    }
})
   

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)