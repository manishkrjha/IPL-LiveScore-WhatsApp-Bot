require('dotenv').config();
const express           = require('express');
const twilio            = require('twilio');

twilio(process.env.SID, process.env.TOKEN);
const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();

var Bot = require('./controllers/bot/bot');

var respo;

setTimeout(()=>{
    respo = Bot.liveScore;
}, 3000);

setTimeout(()=>{
    console.log(`Myrespo: ${respo}`);
}, 3500);

app.get('/', (req, res)=>{
    res.send(`Hello World :: ${respo}`);
});


//post route to send reponse
app.post('/score', (req, res)=>{
    setTimeout(()=>{
    
    const twiml = new MessagingResponse();
    console.log(`This is called`);

    const msg = twiml.message(`Test-mode: ${respo}`);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

    }, 4000);
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App listening port: 3000`);
});