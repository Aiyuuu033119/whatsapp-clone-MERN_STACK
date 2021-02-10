import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Messages from './dbMessages.js';
import Pusher from 'pusher';

//app config
const app = express();
const port = process.env.PORT || 8001;
const connection = 'mongodb+srv://admin:wObRpbJo3GNCQSGr@cluster0.3ztni.mongodb.net/whatsappdb?retryWrites=true&w=majority';
const pusher = new Pusher({
    appId: "1149827",
    key: "1aa2cccedd0457be75b3",
    secret: "228d5300fdca04a01de2",
    cluster: "ap1",
    useTLS: true
  });

//middleware
app.use(express.json());
app.use(Cors());

//db config
mongoose.connect(connection, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;
db.once('open',() =>{
    console.log('DB Connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        console.log('Change occured', change);
        if(change.operationType=='insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        }
        else{
            console.log('Error');
        }
    });
});

//api endpoints
app.get('/', (req, res) => res.status(200).send('Hello World'));

app.get('/messages/sync', (req, res) => {

    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }

    });
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }

    });
});

//listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));