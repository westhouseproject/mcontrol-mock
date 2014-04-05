var express = require('express');

var PORT = 4000;

var app = express();

var bcpm = require('./bcpm');
var devices = [];
var arr = [];

setInterval(function () {
  arr = [];
  bcpm = bcpm.map(function (device) {
    var status = Math.random();
    device.kw.Status = status.toString();
    device.kwh.Status = (parseFloat(device.kwh.Status) + status).toString();
    return device;
  });
  bcpm.forEach(function (device) {
    arr.push(device.kw);
    arr.push(device.kwh);
  });
  devices = arr;
}, 1000);

app.get('/mControl/api/devices', function (req, res) {
  res.json(arr);
});

app.listen(PORT);
console.log('mControl mock listening on port ' + PORT);