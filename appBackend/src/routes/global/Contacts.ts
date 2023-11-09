import express from "express";
import main from "../../controllers/Main";

export const mainRouter = express.Router();

const test = (req,res)=>{
    res.json("Server is Up!!")
}
//Contacts
mainRouter.get("/getContacts",main.getContacts)
mainRouter.post("/addContact",main.addContact)
mainRouter.get("/getContact",main.getContactByID)
mainRouter.post("/updateContact",main.updateContact)
mainRouter.post("/deleteContact",main.deleteContact)
mainRouter.post("/deleteContacts",main.deleteAllContacts)
