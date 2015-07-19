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
    data: [ 0.8003861280158162, 0.045766294933855534, -0.6947634089738131, 1.0423763510771096, -6.254311721306294, -3.5027207620441914, -2.2497135661542416, 1.5811434090137482 ],
    color: '#8085e9',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'United Kingdom',
    code: 'uk',
    data: [ -0.026513680815696716, 0.2596322614699602, -0.1250465209595859, 2.8261713362298906, -7.136834310833365, -2.2033122358843684, -1.4405681150965393, 0.015430223196744919 ],
    color: '#FFB5B5',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Belgium',
    code: 'be',
    data: [ -0.6562195150181651, 0.11077185114845634, 0.23349183844402432, 2.34032182674855, -6.759704993572086, -2.0585665591061115, -2.492034892551601, 0.302150113042444 ],
    color: '#F0B9C8',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Denmark',
    code: 'dk',
    data: [ -0.9196586459875107, 0.13821730902418494, -0.9347781427204609, 1.1386968726292253, -7.786528206430376, -3.951033269520849, -1.9604201037436724, 1.3003937010653317 ],
    color: '#FF7DFF',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'France',
    code: 'fr',
    data: [ -0.6949694897048175, -0.6939964257180691, -0.8149882447905838, 1.622665659058839, -6.786399125121534, -2.8938535563647747, -1.7596458555199206, 0.016040905378758907 ],
    color: '#D881ED',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Germany',
    code: 'de',
    data: [ 0.590273751411587, 0.4887602822855115, 0.5239529423415661, 1.4203002243302763, -6.867954595480114, -2.2798612830229104, -1.6375332847237587, 1.2295234790071845 ],
    color: '#B7B7FF',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Italy',
    code: 'it',
    data: [ -0.33001929288730025, -0.9513893672265112, -0.5672847307287157, 2.9655071436427534, -7.362776417285204, -3.87276827218011, -1.5541076408699155, 0.2987943203188479 ],
    color: '#A6DEEE',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Spain',
    code: 'es',
    data: [ 0.6791468365117908, -0.6211771187372506, -0.8421393241733313, 2.8032962209545076, -6.845766146667302, -3.6098085129633546, -1.1863819574937224, 1.1088872393593192 ],
    color: '#CFE7E2',
    draggableY: false,
    type: 'spline',
    marker: false,
    hover: false
  },{
    name: 'Control',
    code: 'control',
    data: [ 1.59, 1.24, 1.66, 3.52, -5.14, -1.54, -0.1, 2.93 ],
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