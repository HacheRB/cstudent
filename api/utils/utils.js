// Return HTTP error with details in JSON
exports.handleError = (err, res) => {
  return res.status(400).json(err)
}
