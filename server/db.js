/**
 * Created by jbush_000 on 11/18/2015.
 */
"use strict";

var knexcfg = require('./knexfile').development;
var knex = require('knex')(knexcfg);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin( 'registry' );

module.exports = {
    knex: knex,
    bookshelf: bookshelf
};
