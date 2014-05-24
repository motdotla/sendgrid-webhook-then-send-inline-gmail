var dotenv = require('dotenv');
dotenv.load();

var Hapi      = require('hapi');
var port      = parseInt(process.env.PORT) || 3000;
var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

// Create a server with a host and port
var server = Hapi.createServer('localhost', port);

// Add the inbound route
server.route({
  method: 'POST',
  path:   '/inbound',
  handler: function (request, reply) {
    var payload = request.payload;
    var envelope = JSON.parse(payload.envelope);
    var sender_email = envelope.from;
    var receiver_email = envelope.to;

    sendgrid.send({
      to: sender_email,
      from: receiver_email,
      subject: 'Re: '+payload.subject,
      text: 'Oh, hai thar'
    }, function(err, res) {
      console.log(err);
      console.log(res);
    });

    reply({success: true});
  }
});

// Start the server
server.start(function() {
  console.log('sendgrid-webhook-then-send-inline-gmail server started at: ' + server.info.uri);
});
