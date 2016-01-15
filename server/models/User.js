/**
 * Created by jbush_000 on 11/27/2015.
 */

"use strict";

var bookshelf = require('../db').bookshelf;

var User = bookshelf.Model.extend({
    tableName: 'User',
    GameP1: function() {
        return this.hasOne('Game', 'Player1')
    },
    GameP2: function() {
        return this.hasOne('Game', 'Player2')
    }
});

var Users = bookshelf.Collection.extend({
    model: User
});


module.exports = {
    User: bookshelf.model('User', User ),
    Users: Users
};