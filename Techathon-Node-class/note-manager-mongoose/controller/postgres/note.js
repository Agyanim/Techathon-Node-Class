const uuid = require("uuid");
const { pgClient } = require("../../util/pgConnection");
exports.createNote = async (req, res) => {
	const { userId, title, content } = req.body;
	try {
		if (!userId || !title || !content) {
			return res.status(401).json({ message: "All fields must be provided" });
		}
		const sqlQuery = `
        INSERT INTO note_tbl
        (note_id,user_id,title,note)
        VALUES($1,$2,$3,$4)
        RETURNING *
    `;
		const note_id = uuid.v4();
		const sqlValues = [note_id, userId, title, content];
		const note = (await pgClient.query(sqlQuery, sqlValues)).rows[0];
		return res.status(200).json({ message: "Success", note });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};

exports.getAllNote = async (req, res) => {
	try {
		const sqlQuery = `
        SELECT * FROM note_Extend_View

    `;
		const note = (await pgClient.query(sqlQuery)).rows;
		return res.status(200).json({ note });
	} catch (error) {
		return res.status(500).json({ Error: error.message });
	}
};
