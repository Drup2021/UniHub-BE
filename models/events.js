import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  collegeName: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  link: { type: String },
  tags: [{ type: String }],
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
