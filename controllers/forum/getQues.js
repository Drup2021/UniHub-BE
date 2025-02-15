import Questions from "../../models/Question.js"; // Adjust the path as needed

const getQues = async (req, res) => {
  try {
    const questions = await Questions.aggregate([
      {
        $lookup: {
          from: "comments", // Ensure this matches your MongoDB collection name for comments
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
                comment: 1,
                created_at: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "answers", // Ensure this matches your MongoDB collection name for answers
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$question_id", "$$question_id"] },
              },
            },
            {
              $project: { _id: 1 },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $project: { __v: 0 }, // Exclude __v field from the output
      },
    ]);

    return res.status(200).json(questions);
  } catch (err) {
    console.error("Error retrieving questions:", err);
    return res.status(400).json({
      message: "Error in retrieving questions",
      error: err.message,
    });
  }
};

export default getQues;
