const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.get('/', function(req, res) {
//     res.sendfile('index.html');
//  });
app.get('/', (req,res) => { res.sendfile('index.html') } );

let clients = 0;

// Whenever someone connects, this gets executed
io.on('connection', (socket) => {
    console.log('A users connected');

    clients++;
    io.sockets.emit('broadcast', { description: clients + ' clients connected!'});


    // Send a message when

    setTimeout( () =>  {
        // Sending an object when emmitting an event
        socket.emit('testerEvent', {description: 'A custom ecent named testerEvent!'});
    }, 4000); 


    // Connection from a client
    socket.on('clientEvent', (data) => {
        console.log(data);       
    });

    // Whenever someone disconnects, this piece of code executed
    socket.on('disconnect', () => {
        clients--;
        io.sockets.emit('boradcast', { description: clients + ' clients connected'});
        console.log('A used disconnected');
        
    });

} );

http.listen(3000, () => {
    console.log('Listening on port 3000');
    
})


// https://www.tutorialspoint.com/socket.io/socket.io_broadcasting.htm
