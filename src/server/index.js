// Setup empty JS object to act as endpoint for all routes
let projectData = {};
console.log('1');

var path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();


const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


// Respond with JS object when a GET request is made to the homepage
app.get('/getmydata', function (req, res) {
    console.log('3');
    console.log(projectData);
    // res.send(projectData);
    res.json(projectData);
});


app.post('/mydata', addAnalysis);

function addAnalysis(req, res) {
    //  console.log(req.body);

    let newEntry = {
        'agreement': req.body.agreement,
        'irony': req.body.irony,
        'subjectivity': req.body.subjectivity,
        'confidence': req.body.confidence,
    }

    projectData = newEntry;
    console.log('2');
    console.log(projectData);
    res.send(projectData);  // send the updated data back
}




// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


