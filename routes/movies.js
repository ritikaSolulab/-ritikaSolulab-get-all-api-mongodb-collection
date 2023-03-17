const router = require("express").Router();
const { getMovies } = require('../controllers/moviess');

router.get("/movies", getMovies);


module.exports = router;
