import mongoose from "mongoose";
import Questions from "../../models/Question.js"; // Adjust the path as needed

const getQuesbyId = async (req, res) => {
  try {
    const questionDetails = await Questions.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$question_id", "$$question_id"] },
              },
            },
            {
              $project: {
                _id: 1,
                user: 1,
                answer: 1,
                question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$question_id", "$$question_id"] },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                comment: 1,
                created_at: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]).exec();

    res.status(200).json(questionDetails);
  } catch (err) {
    console.error("Error retrieving question by ID:", err);
    res.status(400).json({ message: err.message });
  }
};

export default getQuesbyId;
