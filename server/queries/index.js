/**
 * Created by jbush_000 on 11/22/2015.
 */
var _ = require('lodash');

module.exports = {
    //Id getters
    GetGame: function (idToFetch){
        Game.forge({id: idToFetch}).fetch().then(function(game){
            return game;
        })
    },
    CardIdFinder: function (Cards, Title) {
        return _.result(_.find(Cards, {'Title': Title}), 'id');
    },

    AbilityIdFinder: function (Abilities, Ability) {
        return _.result(_.find(Abilities, {'Ability': Ability}), 'id');
    }
};