var express = require('express');
var fs = require('fs');

var PORT = 4000;

var app = express();

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

app.get('/mControl/api/devices', function (req, res) {
  res.json(arr);
});

app.listen(PORT);
console.log('mControl mock listening on port ' + PORT);