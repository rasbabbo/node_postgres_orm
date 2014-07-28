  var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/person'),
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));
// app.use(express.static(_dirname + 'public'));




app.get("/people", function(req, res){
  Person.all(function(err, allPeople) {
    if (err) {
      console.error('Mucked up!', err);
    } else {
       res.render("people/index", {people: []})
    }
  });
});



app.get("/people/new", function(req, res){
  res.render("people/new")
});



app.get("/people/:id", function(req,res){
  personId = req.params.id;
  Person.findBy('id', personId, function(err, person) {
    if (err) {
      console.error ('Uh oh', err);
    } else {
      res.render("people/show", {person: person}); 
    }
  });
});



app.get("/people/:id/edit", function(req,res){
  personId = req.params.id;
  Person.findBy('id', personId, function(err, person) {
    if (err) {
      console.error ('Uh oh', err);
    } else {
      res.render('people/edit', {person: person}); 
    }
  });
});




app.post("/people", function(req, res){
  newPerson = Person.create(req.body, function(err, newPerson) {
    if (err) {
      console.error('un problemo', err)
    } else {
      res.redirect("/people")
    }
  });
});



app.delete("/people/:id", function(req, res){
  personID = req.params.id;
  Person.findby('id', personId, function(err, person) {
    if (err) {
      console.error("ohh no", err);
      } else {
      person.destroy(function(err) {
        if (err) {
          console.error('trouble!', err);
        } else {
          res.redirect("/people");
        }
      });
    }
  });
});


app.put("/people/:id", function(req,res){
  personID = req.params.id;
  Person.findby('id', personId, function(err, person) {
    if (err) {
      console.error("ohh no", err);
      } else {
      person.update({firstname: req.body.firstname, lastname: req.body.lastname}, function(err, person) {
        if (err) {
          console.error('trouble!', err);
        } else {
          res.redirect("/people");
        }
      });
    }
  });
});

app.listen(3000, function(){
  console.log("THE SERVER IS CRAZYx ON localhost:3000");
});
