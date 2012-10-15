var express = require('express'),
    app = express.createServer(),
    io  = require( 'socket.io' ).listen( app ),
    count = 0,
    countUp = function () {  
      count++; 
      console.log( count );
      io.sockets.send( count ); 
    };

app.configure( function () {
  app.use( express.static( __dirname + '/' ) );
});

setInterval( countUp, 1000 );

app.listen( 3000 );
console.log( 'Server running at http://localhost:3000' );
