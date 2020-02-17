'use strict';

let express = require('express');
let path = require('path');
let fs = require('fs')

// Setup
let app = express();
let PORT = process.env.PORT ||3002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public/assets/css'));
app.use(express.static('public/assets/js/'));

// Basic routes that sends the user to the first AJAX Pages
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));


//more routes
app.get("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        return res.json(notes);
    });
});

app.post("/api/notes", function (req, res) {

    let newNote = req.body;

    fs.readFile("./db/db.json", function (err, notes) {
        if (err) throw err;
        let noteArray = JSON.parse(notes);
        noteArray.push(newNote);
        for (let i = 0; i < noteArray.length; i++) {
            noteArray[i].id = 1 + i;
        };

    fs.writeFile("./db/db.json", JSON.stringify(noteArray), (err) => {
         if (err) throw err;
        console.log("The new note was written to the file.");
        });

    });
    res.json(newNote);

});


// Listener
app.listen(PORT, () => console.log('App listening on PORT ' + PORT));