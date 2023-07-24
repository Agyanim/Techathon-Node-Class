const { readFile, writeFile } = require("fs");
const { writeToFile } = require("./handlingFiles");

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
      console.log(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: data }));
    }
  });
};

exports.getAccountByMail = (res, email) => {
  if (!email) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Email field is required" }));
  }
  readFile("./account.json", "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ message: "Sorry, internal server error occurred" })
      );
    } else {
      data = JSON.parse(data);
      const result = data.find((account) => account.email == email);
      if (result) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: result }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "no record found" }));
      }
    }
  });
};

exports.deleteAccount = (req, res, email) => {
  if (!email) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Email field required" }));
  } else {
    readFile("./account.json", "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Sorry,internal server error occurred" })
        );
      } else {
        data = JSON.parse(data);
        const filteredAccount = data.filter(
          (account) => account.email !== email
        );

        if (filteredAccount) {
          writeToFile("./account.json", JSON.stringify(filteredAccount), res);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Success" }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "no record found" }));
        }
      }
    });
  }
};

exports.updateAccount = (req, res, email) => {
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
        if (!email || !data.firstName || !data.lastName || !data.email) {
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
          const findAcount = fileData.find(
            (account) => account.email === email
          );
          if (!findAcount) {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(
              JSON.stringify({ message: "Sorry, no record found" })
            );
          } else {
            let account = {
              firstName: data.firstName,
              lastName: data.lastName,
              password: findAcount.password,
              email: data.email,
            };

            let filteredAccount = fileData.filter(
              (account) => account.email !== email
            );
            filteredAccount.push(account);
            writeToFile("./account.json", JSON.stringify(filteredAccount));
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(
              JSON.stringify({ message: "Record  updated successfull" })
            );
            //console.log(filteredAccount);
          }
        }
      }
    });
  });
};
