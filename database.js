const mongo = require("mongoose");

(async ()=> {
    try{
        const db = await mongo.connect("mongodb://localhost:27017/serviplusdb");
        console.log("Fue realizada la conexión " + db.connection.name);
    }catch(error){
        console.error(error);
    }
})();