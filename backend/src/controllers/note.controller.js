import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ticket } from "../models/ticket.model.js";
import { Note } from "../models/note.model.js";

const addNote = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    throw new ApiError(409, "Text is required");
  }
  const ticket = Ticket.findById(req.params.ticketId);
  if (!ticket) {
    throw new ApiError(404, "Ticket Not found");
  }

  const note = await Note.create({
    user: req.user._id,
    ticket: req.params.ticketId,
    isStaff: "false",
    text: text,
  });

  const createdNote = await Note.findById(note._id);
  if (!createdNote) {
    throw new ApiError(500, "Error while creating Note");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdNote, "Note created Successfully"));
});

const getNote = asyncHandler(async (req, res) => {
  const note = await Note.find({ ticket: req.params.ticketId });
  if (!note) {
    throw new ApiError(404, "Note does not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, note, "Notes fetched Successfully"));
});

export { getNote, addNote };
