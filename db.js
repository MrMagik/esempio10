const mongoose = require("mongoose");
mongoose
  .connect("mongodb://prova12:prova12@ds131721.mlab.com:31721/prova", {useNewUrlParser: true})
  // .connect("mongodb://localhost/playground")
  .then(() => console.log("connesso al database"))
  .catch(err => console.error("Could not connect to mongdodb...", err));
module.exports.mongoose = mongoose;