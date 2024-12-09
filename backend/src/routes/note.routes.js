import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addNote, getNote } from "../controllers/note.controller.js";

const router = Router();

router.route("/:ticketId/notes").get(verifyJWT, getNote);
router.route("/:ticketId/notes").post(verifyJWT, addNote);

export default router;
