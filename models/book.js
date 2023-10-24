const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/*
    instruction: setup the book schema according to the following requirements:
    - title: (String, required)
    - author: (ObjectId, ref: 'Author', required)
    - publishedDate: (Date)
    - genre: (String)
    - summary: (String)
*/

const bookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    require: true,
  },

  publishedDate: {
    type: Date,
  },
  genre: {
    type: String,
  },
  summary: {
    type: String,
  },
});

const Books = model("Books", bookSchema);
module.exports = Books;
