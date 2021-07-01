const express = require('express');
const app = express();//contendra todas las propiedades de express, asi como funciones
const PORT = 8000;//Puerto asignado com
const path = require('path');
let increment = 0;

//middleware personalizado
app.use((request,response,next) => {
    console.log('hola mundo')
    next();
});

app.use((resquest, response,next) => {
    increment++;
    console.log('numero de visita: ' + increment);
    if(increment === 5 ){
        next(new Error('La pagina ah alcanzo el limite de solicitudes'));
    }

    return next();
    
})


//middleware de incorporado (built-in)
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded()); //permite procesar los datos enviados a traves de from urlencoded



//concepto de middleware para express
//middleware de aplicacion trabaja con los metodos HTTP (Get,Post,Put,Delete)
//van a manejas los objetos request, responsey una funcion llamada next
/*app.get();
app.post();
app.put();
app.delete();*/
app.get('/', (resquest,response, next) => {
    let pathHome = path.join(__dirname, "public", "index.html");
    response.sendFile(pathHome);
})

app.get('/contacto', (request,response,next) => {
    response.send("Pagina de contacto")
})

app.get('/productos', (request,response,next) => {
    response.send('Pagina de productos')
})

//middleware de redireccionamiento
app.get('/tienda', (request,response, next) => {
    response.redirect('/productos')
})

app.post('/registro', (request,response) => {

    //obtener los datos que envia el cliente
    const user = request.body;
    console.log(request.headers)
    console.log(user);
})

//app.use()//atender cualquiere tipo de peticion como un comodin en este caso en rutas que no estan definidas
app.use((resquest, response,next) => {
    let pathNotFound = path.join(__dirname, "public", "404.html");
    response.status(404).sendFile(pathNotFound); //encadenamiento
})

//middleware para el manejo de error y es necesario los 4 argumentos para que express lo detecte como un middleware de errores

app.use((error, resquest,response,next) => {
    console.log('se ha recibido el error')
    console.log(error.message);
    response.status(404).send(error.message);
})

//inicializacion del servidor
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando sobre el puerto ${PORT}`);
});