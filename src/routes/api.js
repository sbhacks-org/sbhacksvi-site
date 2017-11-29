const router = require("express").Router();
const NodeCache = require("node-cache");
const { School, sequelize } = require("../models");

const schoolQueryCache = new NodeCache({ stdTTL: 60 * 4, checkPeriod: 60 * 10 }); 

let school_query = (include_sql) => {
	return `SELECT schools.*, COUNT(applications.id) as application_count
		FROM schools
		LEFT JOIN applications ON schools.id = applications.school_id
		GROUP BY schools.id
		ORDER BY ${include_sql} application_count DESC
		LIMIT 200;`;
}

router.get("/schools", (req, res) => {
	let { include } = req.query;
	let include_sql = isNaN(include) ? "" : `schools.id = ${parseInt(include)} DESC,`;

	schoolQueryCache.get(include_sql, (err, schools) => {
		if(schools) return res.json(schools);

		sequelize.query(school_query(include_sql), { type: sequelize.QueryTypes.SELECT })
		.then((schools) => {
			schoolQueryCache.set(include_sql, schools, () => res.json(schools));
		});
});
	
});

module.exports = router;
