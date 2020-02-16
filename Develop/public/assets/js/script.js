'use strict';

const express = require('express');
const path = require('path');

// Setup
const app = express();
const PORT = 3002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public/assets'));

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

// Listener
app.listen(PORT, () => console.log('App listening on PORT ' + PORT));