const express=require("express")
const { createNote, getAllNote, updateNote, deleteNote, getNoteById } = require("./note")
const noteRouter=express.Router()

noteRouter.post("/note",createNote)
noteRouter.get("/note",getAllNote)
noteRouter.get("/note/:noteId",getNoteById)
noteRouter.put("/note/:noteId",updateNote)
noteRouter.delete("/note/:noteId",deleteNote)




module.exports=noteRouter