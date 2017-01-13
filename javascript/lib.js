var leds = require("rpi-ws2801");

//"connect"
//Connect to LED string
//--------------------------------------
var connect = function(number_of_pixels) {
    leds.connect(number_of_pixels);
};
exports.connect = connect;


//"push"
//Send buffer array to LEDs
//-------------------------
var push = function(buffer) {
    leds.sendRgbBuffer(buffer);
};
exports.push = push;


//"fill"
//fills buffer array with single hex colour

var fill = function(buffer, colour) 
{
  var rgb = leds.getRGBfromHex(colour);

  for (var i=0; i<buffer.length; i+=3) {
    buffer[i] = 255*rgb.r;
    buffer[i+1] = 255*rgb.g;
    buffer[i+2] = 255*rgb.b;
  }
  return buffer;
};
exports.fill = fill;


