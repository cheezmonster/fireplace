var express = require('express');
var f = require('./javascript/lib.js')

var app = express();

var number_of_pixels = 50;
f.connect(number_of_pixels);

var buffer = new Buffer(3*number_of_pixels);

var fillColour = '#FF9329' //warm white at startup;

//fillColour = '#000000'; //Off  

var mode = 'solid';
var ON = true;
var dirty = true;
var delay = 100;

var main = function() {

  if(ON) {
    
    if(dirty) {

      switch(mode) {
        
        case 'solid':
          f.fill(buffer, fillColour);
          f.push(buffer);
          dirty = false;
          break;

        default:
          f.fill(buffer, '#000000');
          f.push(buffer);
          dirty = false;
      }

    }

  } else {

    if(dirty) {
      f.fill(buffer, '#000000');
      f.push(buffer);
      dirty = false;
    }
  }

};

setInterval(main, delay);


app.get('/', function(req, res) {

  if(ON) {
    ON = false;
  } else {
    ON = true;
  }
  dirty = true; 

  console.log('onOff got getted');
});

app.listen(3000, function() {
  console.log('listening')
})
