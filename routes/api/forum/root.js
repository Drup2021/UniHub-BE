import express from "express";
import answer from "../../../controllers/forum/answerController.js";
import comment from "../../../controllers/forum/commentController.js";
import getQues from "../../../controllers/forum/getQues.js";
import getQuesbyId from "../../../controllers/forum/getQuesbyId.js";
import postQuestion from "../../../controllers/forum/postQuestion.js";
const router = express.Router();

router.route("/answer").post(answer);
router.route("/comment/:id").post(comment);
router.route("/question").get(getQues);
router.route("/question/:id").get(getQuesbyId);
router.route("/question").post(postQuestion);

export default router;
