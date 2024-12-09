import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticket.controller.js";

const router = Router();

router.route("/getTickets").get(verifyJWT, getTickets);
router.route("/create-ticket").post(verifyJWT, createTicket);
router
  .route("/:id")
  .get(verifyJWT, getTicket)
  .delete(verifyJWT, deleteTicket)
  .put(verifyJWT, updateTicket);

export default router;
