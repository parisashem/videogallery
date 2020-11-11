let express = require('express');
let app = express();
app.use('/', express.static('public'));


let bodyParser = require('body-parser');
app.use(bodyParser.json());


let Datastore = require("nedb");
let db = new Datastore('peoplesay.db');
db.loadDatabase();


let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);

let messageTracker = [];

app.post("/peoplesay", (req, res)=> {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        message: req.body.msg,
    }

    messageTracker.push(obj);

    db.insert(obj, (err, newDocs)=>
    console.log('new document inserted'))
    if(err) {
        res.json({task: "fail"});
    }
    else {
    res.json({task:success});
    }
    
    })

})

app.use('/', express.static('public'));

app.get('/peoplesay', (req, res)=>{

    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task: "fail"});
        }
        else {
        res.json({task:success});
        }
})

let io = require('socket.io')();
io.listen(server);

io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);


    socket.on('msg', function(data) {
        console.log("Received a 'msg' event");
        console.log(data);

        io.sockets.emit('msg', data);
    });

    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    })

})

});