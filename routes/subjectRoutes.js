const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");


router.post("/add-subject", async (req, res) => {
  try {
    const { name, type, subjectCode, description } = req.body;

    
    if (!name || !type || !subjectCode || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const subject = new Subject({
      name,
      type,
      subjectCode,
      description,
    });

    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    console.error(err); 
    res
      .status(500)
      .json({ message: "An error occurred while creating the subject." });
  }
});

module.exports = router;


router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/delete/:id", async (req, resp) => {
  let result = await Subject.deleteOne({ _id: req.params.id });
  resp.send(result);
}),



  router.get("/subject/:id", async (req, resp) => {
    let result = await Subject.findOne({ _id: req.params.id });
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No Record Found." });
    }
  });
  router.put('/api/subjects/subject/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedSubject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
      res.json(updatedSubject);
    } catch (error) {
      console.error('Error updating subject:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
router.get("/search/:key", async (req, res) => {
  let result = await Subject.find({
    $or: [{ name: { $regex: req.params.key } },
      {type:{$regex:req.params.key}},
    {subjectCode:{$regex:req.params.key}},],
  });
  res.send(result);
});



module.exports = router;
