'use strict';

const express = require('express');

const  {Controller}  = require('./controller.js')
const controller = new Controller();

const app = express();
const jsonParse = express.json();

app.get('/expert/:id',  function(req, res){controller.getExpert(req, res)});
app.get('/experts/', function(req, res){controller.getAllExperts(req, res)});
app.post('/expert/', jsonParse, function(req, res){controller.createExpert(req, res)});
app.put('/expert/:id', jsonParse, function(req, res){controller.updateExpert(req, res)});
app.delete('/expert/:id', function(req, res){controller.deleteExpert(req, res)});
app.delete('/experts/', function(req, res){controller.deleteAllExperts(req, res)});

app.listen(3000);