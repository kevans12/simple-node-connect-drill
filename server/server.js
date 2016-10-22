var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var chatCtrl = require('./controllers/chatCtrl');
var port = 3737;
var config = require('./server_config');

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(session({
  secret: 'somecrazysecretpasswordthing'
  // saveUninitialized: false,
  // resave: false
}));

app.post("/api/screenname", function(req, res){
  session.screenname = req.body.screenname;
  console.log(3333333, session)
})

app.get("/api/chats", chatCtrl.getChats);
app.post("/api/chats", addScreenname, chatCtrl.postChats);
app.delete("/api/chats", chatCtrl.deleteChats);



app.listen(port, function(){
  console.log("Listening on port ", port, " INSERT-WITTY-STATEMENT-HERE");
});

function addScreenname(req, res, next) {
  req.body.screenname = session.screenname;
  next();
}
