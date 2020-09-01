const db = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
// const { json } = require("express");

module.exports = function (app) {

    // API GET Request
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
            // console.log(db);
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

        fs.readFile("./db/db.json", (err, id) => {
            if (err) throw err;
            let deletedNote = req.params.id;
            console.log("#1", deletedNote);
            console.log("#2", db.length);
            // console.log("#3", db[2].id);
            for (let i = 0; i < db.length; i++) {
                if (db[i].id === deletedNote) {
                    db.splice(i, 1);
                    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
                        if (err) throw err;
                    })
                    res.json(db);
                }
            }
            console.log("#4", db);
        })
    });
};