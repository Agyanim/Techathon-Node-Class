const { readFile } = require("fs");
const cuid = require("cuid");
const { writeToFile } = require("./handlingFiles");

exports.createNote = (req, res, userId) => {
	userId = req.query.userId;
	const { title, content } = req.body;
	if (!userId) {
		return res
			.status(400)
			.json({ message: "noteId and userId must be provided" });
	}
	readFile("./account.json", "utf-8", (err, userData) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		userData = JSON.parse(userData);
		const findUser = userData.find((user) => user.userId == userId);
		if (!findUser) {
			return res
				.status(200)
				.json({ message: "Sorry, you do not have an account." });
		}
		readFile("./note.json", "utf-8", (err, noteData) => {
			if (err) {
				return res
					.status(500)
					.json({ message: "Sorry, internal server error occurred" });
			}

			noteData = JSON.parse(noteData);
			if (!title || !content) {
				return res.status(400).json({ message: "All field must be provided" });
			}
			const note = {
				noteId: cuid(),
				userId,
				title,
				content,
				createdOn: new Date().toLocaleString(),
				modifiedOn: new Date().toLocaleString(),
			};
			noteData.push(note);
			writeToFile("./note.json", JSON.stringify(noteData), res);
			return res.status(200).json({ message: "Success", note: note });
		});
	});
};

exports.getAllNote = (req, res) => {
	readFile("./note.json", "utf-8", (err, note) => {
		note;
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		note = JSON.parse(note);
		return res.status(200).json({ message: "Success", note });
	});
};

exports.updateNote = (req, res, noteId) => {
	noteId = req.params.noteId;
	const { title, content } = req.body;
	if (!noteId) {
		return res
			.status(400)
			.json({ message: "noteId must be provided" });
	}
	readFile("./note.json", "utf-8", (err, noteData) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		noteData = JSON.parse(noteData);
		const findNote = noteData.find((note) => note.noteId === noteId);
		if (!findNote) {
			return res
				.status(200)
				.json({ message: "Sorry, note does not exit." });
		}

       title!==undefined? findNote.title=title : findNote.title=findNote.title
       content!==undefined? findNote.content=content : findNote.content=findNote.content
       findNote.modifiedOn=new Date().toLocaleString()

       const filteredNote= noteData.filter(note=>note.noteId !==noteId)
       filteredNote.push(findNote);
        writeToFile("./note.json", JSON.stringify(filteredNote), res);
        return res.status(200).json({ message: "Success", note: findNote });

	});
};

exports.deleteNote = (req, res, noteId) => {
	noteId = req.params.noteId;
	if (!noteId) {
		return res
			.status(400)
			.json({ message: "noteId must be provided" });
	}
	readFile("./note.json", "utf-8", (err, noteData) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		noteData = JSON.parse(noteData);
       const filteredNote= noteData.filter(note=>note.noteId !==noteId)
        writeToFile("./note.json", JSON.stringify(filteredNote), res);
        return res.status(200).json({ message: "Success", note: filteredNote });

	});
};

exports.getNoteById = (req, res, noteId) => {
	noteId = req.params.noteId;
	if (!noteId) {
		return res
			.status(400)
			.json({ message: "noteId must be provided" });
	}
	readFile("./note.json", "utf-8", (err, noteData) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Sorry, internal server error occurred" });
		}
		noteData = JSON.parse(noteData);

       const findNote= noteData.find(note=>note.noteId ==noteId)
        return res.status(200).json({ message: "Success", note: findNote });

	});
};
