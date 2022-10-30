const { Router } = require("express"); 
const routerTickets = Router(); 

const controlTicket = require("../controllers/controllerTickets"); 
const controlUser = require("../controllers/controlUsers"); 

routerTickets.get("/", (req, res) => {
    res.send("Funcionalidad de Tickets Activa"); 
}); 

//Routes
routerTickets.put("/newticket/:id", controlTicket.insertTicket);
routerTickets.post("/newuser", controlUser.usersSave);
routerTickets.delete("/delticket/:idticket", controlTicket.ticketDel);
routerTickets.get("/ticketlist",controlTicket.ticketsList);
routerTickets.put("/updateticket/:idticket", controlTicket.ticketUpdate);
routerTickets.put("/updateuser/:id", controlUser.userUpdate);
routerTickets.delete("/deluser/:id", controlUser.userDelete);
routerTickets.get("/userlist", controlUser.usersList);
routerTickets.post("/login", controlUser.Login);


module.exports = routerTickets; 