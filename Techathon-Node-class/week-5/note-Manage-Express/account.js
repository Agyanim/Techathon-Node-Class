const { readFile, readFileSync, writeFileSync } = require("fs");
const cuid = require("cuid");
const AccountModel=require("./model/account")

exports.createAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
//     let account = new AccountModel({
//       userId: cuid(),
//       firstName: firstName,
//       lastName: lastName,
//       password: password,
//       email: email.toLowerCase(),
//       createdOn: new Date()
//         .toDateString()
//         .replace(/U/, " ")
//         .replace(/\..+/, ""),
//       modifiedOn: new Date()
//         .toDateString()
//         .replace(/U/, " ")
//         .replace(/\..+/, ""),
//     }
// )  ;

let account = new AccountModel({
  userId: cuid(),
  firstName: "firstName",
  lastName: "lastName",
  password: "password",
  email: "email".toLowerCase(),
  createdOn: new Date()
    .toDateString()
    .replace(/U/, " ")
    .replace(/\..+/, ""),
  modifiedOn: new Date()
    .toDateString()
    .replace(/U/, " ")
    .replace(/\..+/, ""),
}
).save()  ;

   if (!firstName || !lastName || !password || !email) {
      return res.status(400).json({ message: "Sorry, all field are required" });
    }

    let data = await readFileSync("./account.json", "utf-8");
    data = JSON.parse(data);
    data.push(account);

AccountModel={

}

    writeFileSync("./account.json", JSON.stringify(data));
    return res.status(201).json({ message: "success", account: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllAccount = async (req, res) => {
  try {
    let data = await readFileSync("./account.json", "utf-8");
    data = JSON.parse(data);
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res, id) => {
	console.log("get");
  try {
    id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User Id must be provided" });
    }
    let filedata = readFileSync("./account.json", "utf-8");
    filedata = JSON.parse(filedata);
    const findUser = filedata.find((user) => user.userId == id);
    if (!findUser) {
      return res.status(200).json({ message: "no record found" });
    }
    return res.status(200).json({ message: "Success", account: findUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res, id) => {
  try {
    const { firstName, lastName, email } = req.body;
    id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User Id must be provided" });
    }
    let filedata = await readFileSync("./account.json", "utf-8");
    filedata = JSON.parse(filedata);
    const findUser = filedata.find((user) => user.userId == id);
    if (!findUser) {
      return res.status(200).json({ message: "no record found" });
    }
    const filteredAccount = filedata.filter((account) => account.userId !== id);

    firstName !== undefined
      ? (findUser.firstName = firstName)
      : (findUser.firstName = findUser.firstName);
    lastName !== undefined
      ? (findUser.lastName = lastName)
      : (findUser.lastName = findUser.lastName);
    email !== undefined
      ? (findUser.email = email)
      : (findUser.email = findUser.email);
    findUser.modifiedOn = new Date()
      .toDateString()
      .replace(/U/, " ")
      .replace(/\..+/, "");
    filteredAccount.push(findUser);
   await writeFileSync("./account.json", JSON.stringify(filteredAccount));
    return res.status(200).json({ message: "Success", account: findUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res, id) => {
  try {
    id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User Id must be provided" });
    }
    let filedata = await readFileSync("./account.json", "utf-8");
    filedata = JSON.parse(filedata);
    const filteredAccount = filedata.filter((user) => user.userId !== id);
    await writeFileSync("./account.json", JSON.stringify(filteredAccount));
    return res
      .status(200)
      .json({ message: "Success", account: filteredAccount });
  } catch (error) {
    return res.status(500).json({ error: error, message });
  }
};
