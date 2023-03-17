const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    plot: {type: String, required: true},
    runtime: {type: Number, required: true},
    poster: {type: String, required: true},
    year: {type: Number, required: true},
    title: {type: String, required: true},
    genres: {type: [String], required: true},
    rated: {type: String, required: true},
    type: {type: String, required: true}
});

module.exports = mongoose.model("movies", movieSchema);
