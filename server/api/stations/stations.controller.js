/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /station              ->  index
 * POST    /station              ->  create
 * GET     /station/:id          ->  show
 * PUT     /station/:id          ->  update
 * DELETE  /station/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Station = require('./stations.model');

// Get list of station
exports.index = function(req, res) {
  Station.find(function (err, stations) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(stations);
  });
};

// Get a single station
exports.show = function(req, res) {
  Station.findById(req.params.id, function (err, station) {
    if(err) { return handleError(res, err); }
    if(!station) { return res.status(404).send('Not Found'); }
    return res.json(station);
  });
};


// Creates a new station in the DB.
exports.create = function(req, res) {
  Station.create(req.body, function(err, station) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(station);
  });
};

// Updates an existing station in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Station.findById(req.params.id, function (err, station) {
    if (err) { return handleError(res, err); }
    if(!station) { return res.status(404).send('Not Found'); }
    var updated = _.merge(station, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(station);
    });
  });
};

// Deletes a station from the DB.
exports.destroy = function(req, res) {
  Station.findById(req.params.id, function (err, station) {
    if(err) { return handleError(res, err); }
    if(!station) { return res.status(404).send('Not Found'); }
    station.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
