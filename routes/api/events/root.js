import express from "express";
const router = express.Router();

router.route("/answer").post(answer);
router.route("/comment/:id").post(comment);
router.route("/question").get(getQues);
router.route("/question/:id").get(getQuesbyId);
router.route("/question").post(postQuestion);
router.route("/")

import { postEvents } from "../events/postEvents.js";
import { getEvents } from "../events/getEvents.js";
import { deleteEvents } from "../events/deleteEvents.js";



router.route("/events").post(postEvents).get(getEvents);
router.route("/events/:id").delete(deleteEvents);




export default router;


