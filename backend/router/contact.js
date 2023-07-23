import express from "express";
import { getContact, addContact, updateContact, deleteContact} from "../controller/contactController.js"

const router = express.Router();

router.get("/:id", getContact);

router.post("/", addContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

export default router;