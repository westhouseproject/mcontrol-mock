function bcpm(id) {
  if (typeof id != 'number') {
    throw new Error('id must be a number');
  }
  var idstr = id.toString();
  if (idstr.length < 2) { idstr = '0' + idstr; }
  return {
    "kw":{
      "Id":id * 2 - 1,
      "Name":"bcpm_" + idstr + "_kw",
      "Order":0,
      "Adapter":"EA.modbus",
      "Address":"1:" + (id * 2 - 1),
      "Image":"Smart Meter",
      "Module":"Modbus_Module",
      "NotifyFlags":32767,
      "Options":"Float|true",
      "Protocols":"ModbusProtocol",
      "Status":"0",
      "Visible":true,
      "ZoneID":0
    },
    "kwh":{
      "Id":id * 2,
      "Name":"bcpm_" + idstr + "_kwh",
      "Order":0,
      "Adapter":"EA.modbus",
      "Address":"1:" + (id * 2),
      "Image":"Smart Meter",
      "Module":"Modbus_Module",
      "NotifyFlags":32767,
      "Options":"Float|true",
      "Protocols":"ModbusProtocol",
      "Status":"0",
      "Visible":true,
      "ZoneID":0
    }
  };
}

var count = parseInt(process.env.COUNT || 5, 10)
var arr = [];
for (var i = 0; i < 42; i++) {
  arr.push(bcpm(i + 1));
}

process.stdout.write(JSON.stringify(arr));