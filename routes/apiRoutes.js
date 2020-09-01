const db = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        })
    });

    // API POST Request
    app.post("/api/notes", (req, res) => {
        req.body.id = uuidv4();
        db.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
            if (err) throw err;
        })
        res.json(db);
    });

    // API DELETE Request
    app.delete("/api/notes/:id", (req, res) => {

        fs.readFile("./db/db.json", (err) => {
            if (err) throw err;
            // Credit:  https://stackoverflow.com/questions/53661683/matching-a-delete-request-to-a-json-object
            let deletedNote = req.params.id;
            for (let i = 0; i < db.length; i++) {
                if (db[i].id === deletedNote) {
                    db.splice(i, 1);
                    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
                        if (err) throw err;
                    })
                    res.json(db);
                }
            }
        })
    });
};