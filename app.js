var express = require('express');
var fs = require('fs');

// TODO: have this be soft coded.
var PORT = 4000;

var devices = require('./devices.json');
var arr = [];

(function loop() {
  arr = [];
  devices.bcpm = devices.bcpm.map(function (device) {
    var status = Math.random() * 0.02;
    device.kw.Status = status.toString();
    device.kwh.Status = (parseFloat(device.kwh.Status) + status).toString();
    return device;
  });
  devices.bcpm.forEach(function (device) {
    arr.push(device.kw);
    arr.push(device.kwh);
  });
  devices.light_switches.forEach(function (device) {
    arr.push(device);
  });

  fs.writeFile('devices.json', JSON.stringify(devices), 'utf8');

  setTimeout(function () { loop(); }, 1000);
})();

var app = express();

app.use(express.json());

app.get('/mControl/api/devices', function (req, res) {
  res.json(arr);
});

app.get('/mControl/api/devices/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].Id === id) {
      return res.json(arr[i]);
    }
  }
  res.send(404, 'Device not found.');
});

app.put('/mControl/api/devices/:id/send_command', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var existed = arr.some(function (device) {
    if (device.Id === id) {
      if (req.body.command === 'on') {
        device.Status = '100';
      } else if (req.body.command === 'off') {
        device.Status = '0';
      }
      return true;
    }
  });
  if (!existed) {
    return res.send(404, 'Device not found.');
  }
  res.send('Success!')
});

app.listen(PORT);
console.log('mControl mock listening on port ' + PORT);