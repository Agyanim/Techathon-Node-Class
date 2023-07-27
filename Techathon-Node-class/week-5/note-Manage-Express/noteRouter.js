const express=require("express")
const { createNote, getAllNote, updateNote, deleteNote, getNoteById } = require("./note")
const noteRouter=express.Router()

noteRouter.post("/",createNote)
noteRouter.get("/",getAllNote)
noteRouter.get("/:noteId",getNoteById)
noteRouter.put("/:noteId",updateNote)
noteRouter.delete("/:noteId",deleteNote)




module.exports=noteRouter