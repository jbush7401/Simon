/**
 * Created by jbush_000 on 11/21/2015.
 */
"use strict";

var bookshelf = require('../db').bookshelf;
var q = require('q');
var _ = require('lodash');

var Game = bookshelf.Model.extend({
    tableName: 'Game'
});


module.exports = {
    Game: bookshelf.model('Game', Game )
};