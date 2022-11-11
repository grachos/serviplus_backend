const mongo = require("mongoose");

(async () => {
    try {
        const db = await mongo.connect("mongodb://localhost:27017/serviplusdb"); //Locall

        //Remoto
        //const db = await mongo.connect("mongodb+srv://grachos:6nQLOq47uXXtTe4K@cluster0.3za8nzp.mongodb.net/serviplusdb?retryWrites=true&w=majority");
        console.log("Fue realizada la conexión " + db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();