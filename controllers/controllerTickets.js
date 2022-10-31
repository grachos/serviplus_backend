//Controller to manage the methods that allow delete, insert, and update a ticket

const modelTickets = require("../models/tickets");


//It edits the User and adds one ticket, that's way it's possible to ADD NEW a ticket
const insertTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            idticket,
            ticketdescript,
            typerequest,
            startdate,
            finishdate,
            ticketstatus
        } = req.body;
        await modelTickets.updateOne({
            _id: id
        }, {
            "$push": {
                "ticketsset": [
                    {
                        "idticket": idticket,
                        "ticketdescript": ticketdescript,
                        "typerequest": typerequest,
                        "startdate": startdate,
                        "finishdate": finishdate,
                        "ticketstatus": ticketstatus
                    }
                ]
            }
        })
        return res.status(200).json({ msg: "unable" });

        const payload = {
            user: { id: user.id },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 3600, //1 hora
            },
            (error, token) => {
                if (error) throw error;

                //Mensaje de confirmación
                res.json({ token });
            }
        );
        return res.status(200).json({ msg: "User's been save" });
    } catch (error) {
        console.log(error);
    }
}

//It finds a ticket by id and DELETE all the documents with that id into the collection
const ticketDel = async (req, res) => {
    try {
        const ticketID = req.params.idticket;

        await modelTickets.updateMany({},
            {
                $pull:
                {
                    ticketsset:
                        { idticket: ticketID }
                }
            }
        );
        return res.status(200).json({ msg: "unable" });
    } catch (error) {
        console.log(error);
    }
}

//It lists all of the tickets
const ticketsList = async (req, res) => {
    let query = 1;
    try {
        const ticketJsList = await modelTickets.find(({ ticketsset: { $elemMatch: {} } }));
        res.status(200).send(ticketJsList);
    } catch (error) {
        console.error(error);
    }
}

//It updates an especific ticket by idticket
const ticketUpdate = async (req, res) => {
    try {
        const ticketID = req.params.idticket;
        const {
            ticketdescript,
            typerequest,
            startdate,
            finishdate,
            ticketstatus
        } = req.body;

        await modelTickets.updateMany(
            { "ticketsset.idticket": ticketID },
            {
                $set:
                {
                    "ticketsset.$.ticketdescript" : ticketdescript,
                    "ticketsset.$.typerequest" : typerequest,
                    "ticketsset.$.startdate" : startdate,
                    "ticketsset.$.finishdate" : finishdate,
                    "ticketsset.$.ticketstatus" : ticketstatus
                }
            });
        /*await modelTickets.updateMany(
            { "ticketsset.idticket": ticketID },
            {
                $set:
                {
                    "ticketsset": [
                        {
                            "idticket": idticket,
                            "ticketdescript": ticketdescript,
                            "typerequest": typerequest,
                            "startdate": startdate,
                            "finishdate": finishdate,
                            "ticketstatus": ticketstatus
                        }
                    ]
                }
            }
        );*/
        return res.status(200).json({ msg: "unable" });
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