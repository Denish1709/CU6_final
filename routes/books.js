const express = require("express");
const router = express.Router();

// instruction: import the book model

const Books = require("../models/book");

// instruction: import the review model

const Reviews = require("../models/review");

/* 
    instruction: 
    - setup GET /: Get all books (use populate() to get author details)
	- Filter books by genre or/and title
        - For instance, if a user wants to filter books by genre, the user can send a GET request to /books?genre=Mystery
*/

router.get("/", async (req, res) => {
  try {
    const { genre } = req.query;

    let filter = {};
    if (genre) {
      filter.genre = genre;
    }
    res.status(200).send(await Books.find(filter).populate("author"));
  } catch (error) {
    res.status(400).send({ message: "Genre not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { title } = req.query;

    let filter = {};
    if (title) {
      filter.title = title;
    }
    res.status(200).send(await Books.find(filter).populate("author"));
  } catch (error) {
    res.status(400).send({ message: "Title not found" });
  }
});

// instruction: setup GET /:id: Get a specific book by its _id (use populate() to get author details)

router.get("/:id", async (req, res) => {
  try {
    const data = await Books.findOne({ _id: req.params.id }).populate("author");
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Book not found" });
  }
});

// instruction: setup POST /: Add a new book
router.post("/", async (req, res) => {
  try {
    const newBooks = new Books({
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      genre: req.body.genre,
      summary: req.body.summary,
    });

    await newBooks.save();
    res.status(200).send(newBooks);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup PUT /:id: Update a book by its _id

router.put("/:id", async (req, res) => {
  try {
    const book_id = req.params.id;

    const updatedBook = await Books.findByIdAndUpdate(book_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup DELETE /:id: Delete a book by its _id

router.delete("/:id", async (req, res) => {
  try {
    const book_id = req.params.id;

    const deleteBook = await Books.findByIdAndDelete(book_id);
    res.status(200).send(deleteBook);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup GET /:id/reviews: Get all reviews for a book by its _id

router.get("/:id", async (req, res) => {
  try {
    const reviews = await Reviews.find({ _id: req.params.id });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).send({ message: "Review not Found" });
  }
});

// instruction: setup POST /:id/reviews: Add a review for a book using the book's _id

router.post("/", async (req, res) => {
  try {
    const newReviews = new Reviews({
      book: newBooks._id,
      reviewerName: req.body.reviewerName,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    await newReviews.save();
    res.status(200).send(newReviews);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: export the router

module.exports = router;
