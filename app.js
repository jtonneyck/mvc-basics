const express =  require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const hbs = require('hbs');
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost/video', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> {
    console.log("Connected to database");
})
.catch((error)=> {
    console.log("Not connected to database, error:", error);
})

app.set("PORT", 3000);
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static('public'));
app.use("/", require("./routes/index"));
app.use("/", require("./routes/movies"));

app.listen(app.get("PORT"), ()=> {
    console.log("app listening on", app.get("PORT"));
})