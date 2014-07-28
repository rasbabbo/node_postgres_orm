var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};


Person.all = function(callback){
  db.query('SELECT * FROM people',[], function(err, res){
    var allPeople = [];
    // do something here with res
    if (err) {
      console.log ("error")
    } else {
      console.log(res.rows);
      res.rows.forEach(function(personThing){
        allPeople.push(new Person(personThing))
      });
    }
      callback(err, allPeople);
    });
}

Person.findBy = function(key, val, callback) {
  var str = 'SELECT * FROM people WHERE ' + key + ' = $1'
  db.query(str, [val], function(err, res){
    var foundRow = res.rows[0];
    var foundPerson = new Person(foundRow);
    // console.log(foundRow);
    callback(err, foundPerson);
  });
};


Person.create = function(params, callback){
  db.query('INSERT INTO people (firstname, lastname) VALUES ($1, $2) RETURNING *', 
    [params.firstname, params.lastname], 
    function(err, res){
    var createdRow, newPerson; 
    if (err) {
      createdRow = res.row[0];
      newPerson = new Person(createdRow);
      callback(err, newPerson);
    }
  });
};


Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }

  var statement = 'UPDATE people SET ' + colNames.join(', ') + ' WHERE id=$1 RETURNING *';
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("OOP! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
    }
    callback(err, _this)
  });
}

Person.prototype.destroy = function(callback){
  var del = 'DELETE FROM people WHERE id =$1'
    db.query(del, [this.id], function(err, res) {
      if (err) {
        console.error('somrhign is messed up!', err);
      } else {
      console.log("destroyed ", res);
      callback(err);
    }
  });
};

module.exports = Person;
