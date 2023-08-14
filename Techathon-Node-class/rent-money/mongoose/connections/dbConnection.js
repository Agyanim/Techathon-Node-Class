const {connect} = require("mongoose");
exports.dbConnection = async (url) => {
	try {
		connect(url);
		console.log("db connection successful");
	} catch (error) {
		console.log(error.message);
	}
};
