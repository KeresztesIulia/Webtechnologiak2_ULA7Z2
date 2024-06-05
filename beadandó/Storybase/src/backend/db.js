var mongo = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectId,
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    Element = require('./classes/testClass');

var url = 'mongodb://127.0.0.1:27017';
var database;
var userCollection;
var elementsCollection;

const app = express();

mongo.connect(url).then(
  db => {
    //database = db.db("testDB");
    database = db.db("StorybaseDB");
    userCollection = database.collection("Users");
    elementsCollection = database.collection("Elements");
    console.log("Successfully connected to the database!"); 
  },
  error => {
    console.log(error);
    throw error;
  }
);

var router = express.Router();
router.route('/elements').post(async (req, res) => {
    //var userID = await userCollection.findOne({username : req.params.user});
    //userID = userID['_id'];
    var element = req.body;
    var id = (await elementsCollection.insertOne(element));
    res.send(JSON.stringify(id.insertedId));

});

router.route('/elements/:id/:field').post(async (req, res) => {
    var id = req.params.id;
    var field = req.params.field;
    var newData = req.body;

    switch(field){
        case("name"):
            await elementsCollection.updateOne({_id: new ObjectId(id)}, {$set:{
                name: newData
            }});
            res.json("OK");
            break;
        case("story"):
            await elementsCollection.updateOne({_id: new ObjectId(id)}, {$set:{
                story: newData
            }});
            res.json("OK");
            break;
        case("sections"):
            await elementsCollection.updateOne({_id: new ObjectId(id)}, {$set:{
                sections: newData
            }});
            res.json("OK");
            break;
        case("all"):
            delete newData._id;
            await elementsCollection.replaceOne({_id: new ObjectId(id)}, newData);
            res.json("OK");
            break;
        default:
            res.error(new Error(`Updating non-valid field! (${field})`));
    }
});

router.route('/stories/:user/:category').get(async (req, res) => {
    //var userID = await userCollection.findOne({username : req.params.user});
    //userID = userID['_id'];
    var user = req.params.user;
    var category = req.params.category;
    var results = await elementsCollection.distinct("story", {category: category, user: user});
    res.json(results);
});

router.route('/elements/:user/:category/:storyFilter').get(async (req, res) => {
    //var userID = await userCollection.findOne({username : req.params.user});
    //userID = userID['_id'];
    var user = req.params.user;
    var category = req.params.category;
    var story = req.params.storyFilter;
    var results;
    if (story == "all") results = await elementsCollection.find({category: category, user: user}).toArray();
    else results = await elementsCollection.find({category: category, story: story, user: user}).toArray();
    res.json(results);
});

router.route('/elements/:id').get(async (req, res) => {
    var id = req.params.id;
    var element = await elementsCollection.findOne({"_id" : new ObjectId(id)});
    res.json(element);
});

router.route('/elements/:id').delete(async (req, res) => {
    var id = req.params.id;
    await elementsCollection.deleteOne({"_id" : new ObjectId(id)});
    res.json("OK");
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(cors());
app.use('', router);

app.listen(8080);
console.log('Database listening on port 8080.');
