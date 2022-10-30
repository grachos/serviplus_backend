//Controller to manage the methods that allow delete, insert, and update a ticket

const modelTickets = require("../models/tickets");


//It edits the User and adds one ticket, that's way it's possible to ADD NEW a ticket
const insertTicket = async(req, res)=>{
    try {
        const id = req.params.id;
        const user = req.body;
        await modelTickets.findByIdAndUpdate(id, user);
        res.send("Se creo el ticket correctamente");
    } catch (error) {
        console.log(error);
    }
}

//It finds a ticket by id and DELETE all the documents with that id into the collection
const ticketDel = async(req, res) =>{
    try {
        const ticketID = req.params.idticket;
        //const ticketJSON = await tickets.findOne({"id_user": userID});
        await modelTickets.updateMany({}, 
            { $pull: 
                { ticketsset: 
                    { idticket: ticketID } 
                } 
            }
        );
        res.send("Se eliminó ticket correctamente " + ticketID);
    } catch (error) {
        console.log(error);
    }
}

//It lists all of the tickets
const ticketsList = async (req, res) => {
    let query =  1;
    try {
        const ticketJsList= await modelTickets.find(({ticketsset:{$elemMatch:{}}}));
        res.status(200).send(ticketJsList); 
    } catch (error) {
        console.error(error); 
    }
}

//It updates an especific ticket by idticket
const ticketUpdate = async(req, res) =>{
    try {
        const ticketID = req.params.idticket;
        const ticket = req.body;
        await modelTickets.updateMany(
            {"ticketsset.idticket": ticketID}, 
            {$set:ticket}
        );
        res.send("Se actualizó ticket correctamente " + ticketID);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    insertTicket, 
    ticketDel,
    ticketsList,
    ticketUpdate
}