const { readFile } = require("fs");
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
        if (!email || !data.content || !data.email || !data.title) {
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
              createdOn: new Date().toLocaleString(),
              title: data.title,
              content: data.content,
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

exports.updateNote = (req, res, id) => {
  console.log(id);
  console.log("it is me");
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end",()=>{
    data=JSON.parse(data)
  })

  if (!id || !data.title || !data.content){
    res.writeHead(400,{"Content-Type":"application/json"})
    return res.end(JSON.stringify({message:"All field are required"}))
  }
  readFile("./note.json","utf-8",(err,noteFile)=>{
    if(err){
      res.writeHead(500,{"Content-Type":"application/json"})
      return res.end(JSON.stringify({message:"Sorry, internal server error occurred"}))
    }
    else{
      noteFile=JSON.parse(noteFile)

    const findNote= noteFile.find(note=> note.id ===id)
if (!findNote){
  res.writeHead(200,{"Content-Type":"application/json"})
  return res.end(JSON.stringify({message:"No record found"}))
}else{
  let modifyNote={
    id:note.id,
    email:note.email,
    createdOn:note.createdOn,
    title: data.title,
    content:data.content,
    modifiedOn: Date().toLocaleString()
  }
  let filteredNote=noteFile.filter(note=> note.id !==id)
  filteredNote.push(modifyNote)
  console.log(filteredNote);
}
    }
  })
};
