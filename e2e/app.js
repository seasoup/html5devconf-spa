var express  = require('express'),
    app      = express(),
    mongodb     = require("mongodb"),
    mongoserver = new mongodb.Server( "localhost", mongodb.Connection.DEFAULT_PORT ),
    db          = new mongodb.Db( "spa", mongoserver ),
    ObjectID    = mongodb.ObjectID;

db.open( function () {
  console.log( 'connected to Mongo' );
});

app.configure( function () {
  app.use( express.static( __dirname + '/public' ) );
});

app.get( '/users/list', function ( req, res ) {
  res.contentType( 'json' );
  db.collection( 'users', function ( err, collection ) {
    collection.find().toArray( function ( err, result ) {
      res.send( result );
    });
  });
});

app.get( '/users/read/:id', function ( req, res ) {
  res.contentType( 'json' );
  db.collection( 'users', function ( err, collection ) {
    collection.findOne( {_id: ObjectID( req.params.id ) }, function ( err, result ) {
      res.send( result );
    });
  });
});

app.listen( 3000 );

console.log("Express server listening on port 3000");