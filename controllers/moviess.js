const Movie = require("../models/Movie");

// getting the movies from the clusters by applying search field and pagination
exports.getMovies = async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 10;
		const search = req.query.search || "";
		let sort = req.query.sort || "rated";
		let genres = req.query.genres || "All";

		const { genreOptions } = req.query

		genres === "All"
			? (genres = [genreOptions])
			: (genres = req.query.genres.split(","))
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const movies = await Movie.find({ plot: { $regex: search, $options: "i" } })
		//console.log(movies)
			.where("genres")
			.in([...genres])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await Movie.countDocuments({
			genres: { $in: [...genres] },
			plot: { $regex: search, $options: "i" },
		});

		const response = {
			status: true,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			movies, 
		};
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
};
