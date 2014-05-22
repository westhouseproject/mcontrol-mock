var express = require('express');
var fs = require('fs');

// TODO: have this be soft coded.
var PORT = 4000;

var bcpm = require('./bcpm');
var devices = [];
var arr = [];

setInterval(function () {
  arr = [];
  bcpm = bcpm.map(function (device) {
    var status = Math.random() * 0.02;
    device.kw.Status = status.toString();
    device.kwh.Status = (parseFloat(device.kwh.Status) + status).toString();
    return device;
  });
  bcpm.forEach(function (device) {
    arr.push(device.kw);
    arr.push(device.kwh);
  });
  devices = arr;

  fs.writeFile('bcpm.json', JSON.stringify(bcpm), 'utf8');
}, 1000);

var app = express();

app.get('/mControl/api/devices', function (req, res) {
  res.json(arr);
});

app.put('/mControl/api/devices/:id/send_command', function (req, res) {
  res.send(501, 'Coming soon');
});

app.listen(PORT);
console.log('mControl mock listening on port ' + PORT);