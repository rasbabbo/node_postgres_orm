var Person = require('./person');

var Models = {};	

Models.Person = Person;

// var me = {firstname: "Tim", lastname: "Licata"};

// Models.Person.create(me, function (err, person) {
// 	console.log("Hope this works")
// });

// Models.Person.all(function(err, people){
//   console.log(people);
// });

// Models.Person.findBy("id", 2, function(err, person){
//   console.log("found", person);
//   // person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//   //   console.log("UPDATED:", person)
//   });
// })

Models.Person.findBy("id", 12, function(err, person) {
	console.log("Qing ", person);
	var destroyed = person;

	destroyed.destroy(function(err, destroyed) {
	console.log("destroyed", destroyed)
	});
})



module.exports = Models;