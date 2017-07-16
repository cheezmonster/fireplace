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

//"flicker"
//flickering effect

var flicker = function(buffer, colour, max, min)
{
  var rgb = leds.getRGBfromHex(colour);
  
  for (var i=0; i<buffer.length; i+=3) {
    var rand = (Math.random()*(max - min)) + min
    
    buffer[i] = rgb.r * rand;
    buffer[i+1] = rgb.g * rand;
    buffer[i+2] = rgb.b * rand;   
  };
  return buffer;
};
exports.flicker = flicker;

//"rainbowElement"

//var rainbowElement = function(i, N, j)
//{
  


//"RainbowFill"

var rainbowFill = function(buffer,N,j,L) 
{
  for (var i=0; i<N; i++) {
    var k = 3*i;
    
    buffer[k] = Math.sin(2*Math.PI*(i/N + j/L)) * 127 +128;
    buffer[k+1] = Math.sin(2*Math.PI*(i/N + j/L + 1/3)) * 127 + 128;
    buffer[k+2] = Math.sin(2*Math.PI*(i/N + j/L + 2/3)) * 127 + 128;

  };
  return buffer;
};
exports.rainbowFill = rainbowFill;
