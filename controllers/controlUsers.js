const jwt = require("jsonwebtoken");
const modelTickets = require("../models/tickets");


//It INSERT a NEW user into the colection
const usersSave = async (req, res) =>  {
    try {
        const {email} = req.body;
        const modeluser = await modelTickets.findOne({email: email});
        if (modeluser){
            return res.status(400).json({msg:"disable"});
        }else{
            const user = new modelTickets(req.body); 
            await user.save(); 
            return res.status(200).json({
                msg: "unable",
            });
        }
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
     return res.status(200).json({msg: "User's been save"});     

    } catch (error) {
        console.error(error); 
    }
}

//It update a user  by user id
const userUpdate = async(req, res)=>{
    try {
        const id = req.params.id;
        const user = req.body;
        await modelTickets.findByIdAndUpdate(id, user);
        return res.status(200).json({msg: "update"})
    } catch (error) {
        console.log(error);
    }
}

const userDelete = async(req, res)=>{
    try {
        const id = req.params.id;
        await modelTickets.findByIdAndDelete({_id: id});
        //res.send("Usuario eliminado correctamente");
        return res.status(200).json({msg: "deleted"});
    } catch (error) {
        console.log(error);
    }
}

//It lists all of the users their ticket
const usersList = async (req, res) => {
    try {
        const ticketJsList= await modelTickets.find();
        res.status(200).send(ticketJsList); 
    } catch (error) {
        console.error(error); 
    }
}

//It lists all of the users their ticket
const findUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await modelTickets.find({_id: id},{ticketsset: 0});
        res.status(200).send(user); 

    } catch (error) {
        console.error(error); 
    }
}

const Login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const modeluser = await modelTickets.findOne({email: email});
        if (modeluser){
            if(modeluser.passwd === password){
                return res.status(200).json({
                    msg: "unable",
                    id_user: modeluser._id
                });
            }else{
                return res.status(400).json({msg:"disable"});
            }
        }else{
            return res.status(400).json({msg:"disable"});
        }

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
     return res.status(200).json({msg: "User's been save"});     

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    usersSave,
    userUpdate, 
    userDelete,
    usersList,
    Login,
    findUser
}