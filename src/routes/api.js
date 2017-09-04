const router = require("express").Router();
const { School, sequelize } = require("../models");

let school_query = (include_sql) => {
	return `SELECT schools.*, COUNT(applications.id) as application_count
		FROM schools
		LEFT JOIN applications ON schools.id = applications.school_id
		GROUP BY schools.id
		ORDER BY ${include_sql} application_count DESC
		LIMIT 25;`;
}

router.get("/schools", (req, res) => {
	let { include } = req.query;
	let include_sql = isNaN(include) ? "" : `schools.id = ${include} DESC,`;

	sequelize.query(school_query(include_sql), { type: sequelize.QueryTypes.SELECT })
	.then((schools) => {
		res.json(schools);
	});
});

module.exports = router;
