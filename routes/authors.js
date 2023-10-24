const express = require("express");
const router = express.Router();

// instruction: import the author model

const Authors = require("../models/author");

// instruction: GET /: List all authors

router.get("/", async (req, res) => {
  try {
    const authors = await Authors.find();
    res.status(200).send(authors);
  } catch (error) {
    res.status(400).send({ message: "Author not Found" });
  }
});

// instruction: setup GET /:id: Get a specific author by its _id

router.get("/:id", async (req, res) => {
  try {
    const data = await Authors.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Author not Found" });
  }
});

// instruction: setup POST /: Add a new author

router.post("/", async (req, res) => {
  try {
    const newAuthors = new Authors({
      name: req.body.name,
      biography: req.body.biography,
      dob: req.body.dob,
    });

    await newAuthors.save();
    res.status(200).send(newAuthors);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup PUT /:id: Update a author by its _id

router.put("/:id", async (req, res) => {
  try {
    const author_id = req.params.id;

    const updatedAuthor = await Authors.findByIdAndUpdate(author_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedAuthor);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup DELETE /:id: Delete a author by its _id

router.delete("/:id", async (req, res) => {
  try {
    const author_id = req.params.id;

    const deleteAuthor = await Authors.findByIdAndDelete(author_id);
    res.status(200).send(deleteAuthor);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: export the router

module.exports = router;
