const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const weatherbot= require('./weatherApi/weatherbot')

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    console.log("All")
    res.send("Node Home")
});

app.use('/weatherbot', weatherbot);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

