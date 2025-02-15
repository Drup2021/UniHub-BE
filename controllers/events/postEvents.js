import Event from "../../models/events.js";

const postEvents = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default postEvents;
