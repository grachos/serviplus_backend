//Archivo para inicializar el proyecto de tickets.
const app = require("./app");
const cors = require("cors");
var port = 4000;


const mongo = require("./database");
const ticketsRoutes = require("./routers/tickets.routes");

app.use(cors());

app.listen(port, ()=>{
    console.log("Salida por el puerto: " + port);
});

app.get('/', (req, res)=>{
    res.send('API corriendo correctamente Ubuntu!!!');
});

// Configuracion de rutas
app.use("/tickets", ticketsRoutes);