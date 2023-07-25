const { createServer } = require("http");
const url = require("url");
const {
  createAccount,
  getAccountByMail,
  deleteAccount,
  updateAccount,
  getAllAccount,
} = require("./account");
const { addNote, updateNote } = require("./note");

const server = createServer((req, res) => {
  const method = req.method;
  // setting the third parameter to true gives back the query parameter as Java Script object for easy access
  const parsedUrl = url.parse(req.url, true);
  // getting the email parameter from the query object
  const { email, id } = parsedUrl.query;
  const pathname = parsedUrl.pathname;
  // console.log(parsedUrl.query);
  switch (method) {
    case "GET":
      switch (pathname) {
        case "/":
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("Home");
          break;
        case "/account":
          getAllAccount(req, res);
          break;
        case "/account/email":
          getAccountByMail(res, email);
          break;
        default:
          break;
      }
      // Inner Switch Statement ends here
      break;
    // outer switch statement continue from here
    case "POST":
      switch (pathname) {
        case "/account":
          createAccount(req, res);
          break;
        case "/note":
          addNote(req, res, email);
          break;
        default:
          break;
      }
      break;
    case "DELETE":
      switch (pathname) {
        case "/account":
          deleteAccount(req, res, email);
          break;
        default:
          break;
      }
      break;
    case "PUT":
      switch (pathname) {
        case "/account":
          updateAccount(req, res, email);
          break;
        case "note/id":
          console.log("put");
          updateNote(req, res, id);
          break;
          
        default:
          break;
      }
    default:
      break;
  }
});
server.listen(3000, () => {
  console.log("Server stated and listening on port 3000");
});
