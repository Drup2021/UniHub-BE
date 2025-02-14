import Answers from "../../models/Answers.js";
const answer = async (req, res) => {
  try {
    const answerData = new Answers({
      question_id: req.body.question_id,
      answer: req.body.answer,
      user: req.body.user,
    });

    await answerData
      .save()
      .then((doc) => {
        res.status(201).send(doc);
      })
      .catch((err) => {
        res.status(400).send({
          message: "Answer not added successfully",
        });
      });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default answer;
