  var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));




app.get("/people", function(req, res){
  res.render("people/index", {people: []})
});

app.get("/people/new", function(req, res){
  var insert = Person.create(params);
  request(insert, function(error, response, body) {
    if (!error) {
      var data = JSON.parse(body);
      res.render("index.ejs", {newList: data.Search || [] })
    }
  });
  // res.render("people/new")
});

app.get("/people/:id", function(req,res){
  var query = req.params.id;
  var person = Person.findBy(id);
  request (person, function(error, response, body){
    if(!error) {
      var data = JSON.parse(body);
    }
  });
  res.render("people/show", {person: {} });
});



app.post("/people/:id/edit", function(req,res){
  var change = Person.update(params);
  res.render("people/edit", {person: {} });
});



app.post("/people", function(req, res){
  res.redirect("/people")
});

app.delete("/people/:id", function(req, res){
  res.redirect("/people");
});

app.put("/people/:id", function(req,res){
  res.redirect("/people");
})

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
