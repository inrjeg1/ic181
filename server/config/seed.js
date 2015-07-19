/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Economy = require('../api/economy/economy.model');
var User = require('../api/user/user.model');

Economy.find({}).remove(function() {
  Economy.create({
    name: 'The Netherlands',
    code: 'nl',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#8085e9',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'United Kingdom',
    code: 'uk',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#FFB5B5',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Belgium',
    code: 'be',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#F0B9C8',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Denmark',
    code: 'dk',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#FF7DFF',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'France',
    code: 'fr',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#D881ED',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Germany',
    code: 'de',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#B7B7FF',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Italy',
    code: 'it',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#A6DEEE',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Spain',
    code: 'es',
    data: [ -4.6929656716436146, 0.9889368311036377, 1.0963423997163773, 1.6686230711638927, -0.5567911425791682, -1.7162656151689588, 5.891584895427804, 0.7 ],
    color: '#CFE7E2',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Control',
    code: 'control',
    data: [ -3.56, 0.6, 1.39, 1.5, 0.28, -1.2, -3.09, 0.5 ],
    color: '#ccc',
    draggableY: true,
    type: 'line',
    marker: true,
    hover: true
  }, function() {
      console.log('** Finished populating economy.')
    }
  );
}); 

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Team 1',
    email: 'team1',
    password: 'team1'
  },{
    provider: 'local',
    role: 'admin',
    name: 'Emanuel',
    email: 'emanuel@atradius.com',
    password: 'admin'
  },{
    provider: 'local',
    role: 'admin',
    name: 'Jonathan',
    email: 'jonathan@atradius.com',
    password: 'admin'
  }, function() {
      console.log('** Finished populating teams.');
    }
  );
});