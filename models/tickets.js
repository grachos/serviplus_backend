const mongoose = require('mongoose');

const ticketsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: false
        },
        id_user: {
            type: String,
            require: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        passwd: {
            type: String,
            require: true,
            unique: false
        },
        typeroll: {
            type: String,
            require: true,
            unique: false
        },
        ticketsset: [
          {
            idticket: {
                type: String,
                require: true,
                unique: false
            },
            ticketdescript: {
                type: String,
                require: true,
                unique: false
            },
            typerequest: {
                type: String,
                require: true,
                unique: false
            }, 
            startdate: {
                type: String,
                require: true,
                unique: false
            }, 
            finishdate: { 
                type: String,
                require: true,
                unique: false
            },
            ticketstatus: {
                type: String,
                require: true,
                unique: false
            }
          }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const tickets = new mongoose.model("tickets", ticketsSchema);
module.exports = tickets;