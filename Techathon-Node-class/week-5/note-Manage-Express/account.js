const {readFile}=require("fs")
exports.createAccount = (req, res) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      data = JSON.parse(data);
      const account = {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email.toLowerCase(),
      };
  
      if (
        !account.firstName ||
        !account.lastName ||
        !account.password ||
        !account.email
      ) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Sorry, all field are required" })
        );
      }
  
      readFile("./account.json", "utf-8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({ message: "Sorry, internal server error occurred" })
          );
        } else {
          data = JSON.parse(data);
          data.push(account);
          writeToFile("./account.json", JSON.stringify(data), res);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "success" }));
        }
      });
    });
  };
  
  exports.getAllAccount = (req, res) => {
    readFile("./account.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Sorry, internal server error occurred" })
        );
      } else {
        data = JSON.parse(data);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: data }));
      }
    });
  };
  