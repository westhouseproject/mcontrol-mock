var express = require('express');
var config = require('./config');

var PORT = 4000;

var app = express();

var devices = config.devices;

setInterval(function () {
  var dev = devices.filter(function (device) {
    return (/^bcpm_([0-9]+)_kwh?$/).test(device.Name);
  });
  var kWs = dev.filter(function (device) {
    return (/w$/).test(device.Name);
  }).sort();
  var kWhs = dev.filter(function (device) {
    return (/h$/).test(device.Name);
  }).sort();
  for (var i = 0, len = kw.length; i < len; i++) {
    var kW = Math.random() * 20;
    var currentkWh = parseFloat(kWhs[i]);
    kWs[i].Status = kW.toString();
    kWhs[i].Status = (kW + currentkWh).toString();
  }
}, 1000);

app.get('/mControl/api/devices', function (req, res) {
  res.json();
});

app.listen(PORT);
console.log('mControl mock listening on port 3000');