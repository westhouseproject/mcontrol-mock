// Generates an object with two BCPM data devices: kw, kwh.
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

function solarPV(id) {
  return [
    {
      Id: 137,
      Name: "Current",
      Order: 0,
      Adapter: "XantrexGT",
      Address: "COM5",
      Image: "Light EU",
      Module: "Current",
      NotifyFlags: 32767,
      Options: "",
      Protocol: "XantrexGT",
      Status: "0",
      Visible: true,
      ZoneID: 0
    },
    {
      Id: 138,
      Name: "Voltage",
      Order: 0,
      Adapter: "XantrexGT",
      Address: "COM5",
      Image: "Light EU",
      Module: "Voltage",
      NotifyFlags: 32767,
      Options: "",
      Protocol: "XantrexGT",
      Status: "0",
      Visible: true,
      ZoneID: 0
    },
    {
      Id: 139,
      Name: "Power",
      Order: 0,
      Adapter: "XantrexGT",
      Address: "COM5",
      Image: "Light EU",
      Module: "Power",
      NotifyFlags: 32767,
      Options: "",
      Protocol: "XantrexGT",
      Status: "0",
      Visible: true,
      ZoneID: 0
    },
    {
      Id: 140,
      Name: "Energy",
      Order: 0,
      Adapter: "XantrexGT",
      Address: "COM5",
      Image: "Light EU",
      Module: "Energy",
      NotifyFlags: 32767,
      Options: "",
      Protocol: "XantrexGT",
      Status: "0",
      Visible: true,
      ZoneID: 0
    }
  ];
}

// Generates a light switch INSTEON device.
function lightSwitch(id) {
  if (typeof id != 'number') {
    throw new Error('id must be a number');
  }
  var idstr = id.toString();
  if (idstr.length < 2) { idstr = '0' + idstr; }
  return {
    "Id":id,
    "Name":"switch_" + id,
    "Order":0,
    "Adapter":"2414x",
    "Address":"18:18:" + id,
    "Image":"Lamp",
    "Module":"INST_BINSW",
    "NotifyFlags":32767,
    "Options":"",
    "Protocols":"INSTEON",
    "Status":"0",
    "Visible":true,
    "ZoneID":0
  }
}

var output = { bcpm: [], light_switches: [], solar_pv: [] };
for (var i = 0; i < 42; i++) {
  output.bcpm.push(bcpm(i + 1));
}

i = i*2 + 1;
var max = i + 8;

for (; i < max; i++) {
  output.light_switches.push(lightSwitch(i));
}

solarPV().forEach(function (value) {
  output.solar_pv.push(value);
});

process.stdout.write(JSON.stringify(output));