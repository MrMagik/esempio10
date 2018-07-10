//schema

const { mongoose } = require("./db.js");
const courseSchema = new mongoose.Schema({
  name: String
});
//model
const Course = mongoose.model("Tests", courseSchema);

async function addDocuments(req, res) {
  if (!req.body.name || req.body.name === 0) {
    return res.status(400).send("Bad request");
  }
  let newObject = new Course({
    name: req.body.name
  });
  try {
    const result = await newObject.save(); //save è asincrona, perchè ci vorrà del tempo perchè si salvi l'oggetto nel database, perchè acceddiamo ad un file sistem. Quindi ritorna una promise
    console.log(result);
    res.status(200).send(result);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}

async function getDocuments(res) {
  try {
    let documents = await Course.find();
    res.status(200).send(documents);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}
async function getDocumentByName(req, res) {
  try {
    let document = await Course.findOne({ name: req.params.name });
    if (!document) return res.status(404).send("Not found");
    res.status(200).send(document);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}

async function deleteDocumentByName(req, res) {
  try {
    let document = await Course.findOneAndDelete({ name: req.params.name });
    if (!document){
      return res.status(404).send("Not found");
    }

    res.status(200).send(document);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}

async function updateDocumentByName(req, res) {
  try {
    let document = await Course.findOneAndUpdate(
      { name: req.params.name },
      { name: req.body.name },
      { new: true }
    ); //new:true permette di ottenere il documento modificato

    if (!document) return res.status(404).send("Not found");

    res.status(200).send(document);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}
module.exports.addDocuments = addDocuments;
module.exports.getDocuments = getDocuments;
module.exports.getDocumentByName = getDocumentByName;
module.exports.deleteDocumentByName = deleteDocumentByName;
module.exports.updateDocumentByName = updateDocumentByName;
module.exports.Course = Course;

