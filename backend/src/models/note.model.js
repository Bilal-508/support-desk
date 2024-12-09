import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    text: {
      type: String,
      required: ["true", "Please add some text"],
    },
    isStaff: {
      type: Boolean,
      default: true,
    },
    staffId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
