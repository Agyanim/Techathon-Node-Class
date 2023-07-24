const { readFile, writeFile } = require("fs");
const { writeToFile } = require("./handlingFiles");

exports.addNote = (req, res, email) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    data = JSON.parse(data);
    readFile("./account.json", "utf-8", (err, fileData) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Sorry,internal server error occurred" })
        );
      } else {
        fileData = JSON.parse(fileData);
        if (!email || !data.note || !data.email) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "All field must be provided" })
          );
        }
        if (!fileData) {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Sorry,internal server occurred" })
          );
        } else {
          const findAccount = fileData.find(
            (account) => account.email === email
          );
          console.log(findAccount);
          if (!findAccount) {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(
              JSON.stringify({
                message: "Sorry, you must create account first",
              })
            );
          } else {
            let note = {
              id: new Date().getMilliseconds(),
              email: data.email,
              note: data.note,
            };
            readFile("./note.json", "utf-8", (err, fileNote) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(
                  JSON.stringify({
                    message: "Sorry,internal server error occurred",
                  })
                );
              } else {
                fileNote = JSON.parse(fileNote);
                fileNote.push(note);
                writeToFile("./note.json", JSON.stringify(fileNote));
                res.writeHead(200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "not added" }));
              }
            });
          }
        }
      }
    });
  });
};
