const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.get('/', function(req, res) {
//     res.sendfile('index.html');
//  });
app.get('/', (req,res) => { res.sendfile('index.html') } );

// Whenever someone connects, this gets executed
io.on('connection', (socket) => {
    console.log('A users connected');

    // Whenever someone disconnects, this piece of code executed
    socket.on('disconnected', () => {
        console.log('A used disconnected');
        
    });

} );

http.listen(3000, () => {
    console.log('Listening on port 3000');
    
})