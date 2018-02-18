var express = require('express'),
    app = express(),
    path = require('path'),
    package = require('../package'),
    allGroups = require('../groups').groups,
    _ = require('underscore');
		

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/status',function (req, res) {
    res.json({ app: package.name, version: package.version });
});

app.get('/businesses',function (req, res) {
    var allBusinesses = require('../businesses').businesses;
    res.render('businesses', { allBusinesses });
});

app.get('/community-groups',function (req, res) {
    var communityGroups = _.where(allGroups, {community: "yes"});
    res.render('community-groups', { communityGroups });
});

app.get('/history',function (req, res) {
    var allArticles = require('../articles').articles,
        allPlaces = require('../places').places,
        historicalArticles = _.where(allArticles, {historical: "yes"}),
        historicalPlaces = _.where(allPlaces, {historical: "yes"});

    res.render('history', { historicalArticles, historicalPlaces });
});

app.get('/places-of-interest',function (req, res) {
    var allPlaces = require('../places').places,
        placesOfInterest = _.where(allPlaces, {interesting: "yes"}),
        historicalPlaces = _.where(allPlaces, {historical: "yes"}),
        nearbyPlaces = _.where(allPlaces, {nearby: "yes"}),
        islands = _.where(allPlaces, {islands: "yes"}),
        towns = _.where(allPlaces, {towns: "yes"});

    res.render('places', { placesOfInterest, historicalPlaces, nearbyPlaces, islands, towns });
});

/*
app.get('/',function (req, res) {
    res.render('index');
});


*/

// See: .ebextensions for NGINX rules which mean AWS ELB ignores this
app.use('/', express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
