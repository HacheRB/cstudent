//REGEX Constants
const EMAILREGEX = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/

//Validations 


//ERROR HANDLING


// Return HTTP error with details in JSON
exports.handleError = (err, res) => {
  return res.status(400).json(err)
}


console.log("<<<<<<<<<<<<<<<<<<<<<<<<")
console.log()
console.log("<<<<<<<<<<<<<<<<<<<<<<<<")