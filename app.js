var express = require('express');
var f = require('./javascript/lib.js')

var app = express();

var number_of_pixels = 50;
f.connect(number_of_pixels);

var buffer = new Buffer(3*number_of_pixels);

var fillColour = '#FF9329' //warm white at startup;
f.fill(buffer, fillColour);
f.push(buffer);

//fillColour = '#000000'; //Off  

var mode = 'solid';
var ON = true;
var dirty = true;
var delay = 100;
var lambda = 50;
var j = 0;

var main = function() {

  if(ON) {
    
    if(dirty) {

      switch(mode) {
        
        case 'solid':
          f.fill(buffer, fillColour);
          f.push(buffer);
          dirty = false;
          break;
        
        case 'flicker':
          f.flicker(buffer,fillColour, 255, 200);
          f.push(buffer);
          break;        
        
        case 'rainbow':
          f.rainbowFill(buffer, number_of_pixels, j, lambda);
          f.push(buffer);
          j++;
          if (j>lambda) {
            j=0;
          };
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

var run = setInterval(main, delay);


app.get('/power', function(req, res) {

  if(ON) {
    ON = false;
  } else {
    ON = true;
  }
  dirty = true; 
  console.log('ON = '+ON);
  res.send({"ON": ON});
});

app.get('/setColour', function(req, res) {
  if (ON) {
    fillColour = req.query.colour;
    dirty = true;
  }
  res.send({"COLOUR": fillColour});
});


app.get('/flicker', function(req, res) {
  if (ON) {
    if (mode != 'flicker') {
      mode = 'flicker';
    } else {
      mode = 'solid';
    };
    dirty = true;
  };
  res.send({"MODE": 'flicker'});

});

app.get('/solid', function(req, res) {
  if (ON) {
    mode = 'solid';
    dirty = true;
    res.send({"MODE": 'solid'});
  };
});

app.get('/setDelay', function(req, res) {

  delay = req.query.delay;
  clearInterval(run);
  run = setInterval(main, delay);
  res.send({"DELAY": delay + 'ms'});
});

app.get('/setLambda', function(req, res) {

  lambda = req.query.lambda;
  res.send({"LAMBDA": lambda});
});

app.get('/rainbow', function(req, res) {

  mode = 'rainbow';
  dirty = true;
  res.send({"MODE": 'rainbow'});
});


app.listen(3000, function() {
  console.log('listening')
})
