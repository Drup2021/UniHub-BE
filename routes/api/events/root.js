import express from "express";
const router = express.Router();

import postEvents from "../../../controllers/events/postEvents.js";
import getEvents from "../../../controllers/events/getEvents.js";
import deleteEvents from "../../../controllers/events/deleteEvents.js";

router.route("/events").post(postEvents).get(getEvents);
router.route("/events/:id").delete(deleteEvents);

export default router;
