import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Ticket } from "../models/ticket.model.js";

const getTickets = asyncHandler(async (req, res) => {
  //TODO: check find method in docs
  const tickets = await Ticket.find({ user: req.user._id });
  if (!tickets) {
    throw new ApiError(404, "Tickets not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, tickets, "Tickets fetched successfully"));
});

const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, ticket, "Ticket fetched Successfully"));
});

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if ([product, description].some((item) => item?.trim() === "")) {
    throw new ApiError(409, "All fields are required");
  }
  const ticket = await Ticket.create({
    product: product,
    description: description,
    user: req.user._id,
    status: "new",
  });
  const createdTicket = await Ticket.findById(ticket._id);
  if (!createdTicket) {
    throw new ApiError(500, "Error while creating Ticket");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdTicket, "Ticket created successfully"));
});

const updateTicket = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    throw new ApiError(409, "Status is required");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: status,
      },
    },
    {
      new: true,
    }
  );
  res
    .status(200)
    .json(new ApiResponse(200, updatedTicket, "Ticket updated successfully"));
});
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }
  // await ticket.remove();
  res.status(200).json(new ApiResponse(200, {}, "Ticket deleted Successfully"));
});

export { getTickets, getTicket, createTicket, updateTicket, deleteTicket };
