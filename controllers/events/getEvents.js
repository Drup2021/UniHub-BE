import Event from "../../models/events.js";

const getEvents = async (req, res) => {
  try {
    const filter = req.query.tag ? { tags: req.query.tag } : {};
    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getEvents;
