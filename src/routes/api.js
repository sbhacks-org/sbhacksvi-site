const router = require("express").Router();
const { School, sequelize } = require("../models");

let school_query =
`SELECT schools.*, COUNT(applications.id) as application_count
FROM schools
LEFT JOIN applications ON schools.id = applications.school_id
GROUP BY schools.id
ORDER BY application_count DESC
LIMIT 25;`;

router.get("/schools", (req, res) => {
	sequelize.query(school_query, { type: sequelize.QueryTypes.SELECT })
	.then((schools) => {
		res.json(schools);
	});
});

module.exports = router;
