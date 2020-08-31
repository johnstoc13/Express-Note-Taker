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
        fs.writeFile("./db/db.json", JSON.stringify(db), (err,) => {
            if (err) throw err;
        })
        res.json(db);
    });

    // **** POST `/api/notes` ****
    // Should receive a new note to 
    // save on the request body, add it to the `db.json` file, 
    // and then return the new note to the client.






    // app.post("/api/clear", function (req, res) {
    //     // Empty out the arrays of data
    //     tableData.length = 0;
    //     waitListData.length = 0;

    //     res.json({ ok: true });
    // });


    //   * DELETE`/api/notes/:id` - Should receive a query parameter 
    // containing the id of a note to delete.This means you'll need to find
    //  a way to give each note a unique `id` when it's saved.In order to 
    //  delete a note, you'll need to read all notes from the `db.json` file, 
    //  remove the note with the given `id` property, and then rewrite the 
    //  notes to the `db.json` file.
};
