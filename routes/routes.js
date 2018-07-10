const express = require("express");
const model = require("../model");
const router = express.Router();

router.get("/", (req, res) => {
  model.getDocuments(res);
});

router.get("/:name", (req, res) => {
    model.getDocumentByName(req,res);
});

router.post("/", (req, res) => {
  if (!req.body.name || req.body.name === 0) {
    return res.status(400).send("Missing name");
  }
  model.addDocuments(req, res);
});

router.delete("/:name", (req, res) => {
    model.deleteDocumentByName(req,res);
});

router.put("/:name", (req,res) => {
  model.updateDocumentByName(req,res);
});
module.exports = router;
