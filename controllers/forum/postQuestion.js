import Question from "../../models/Question.js";

const postQuestion = async (req, res) => {
  try {
    const questionData = new Question({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tag,
      user: req.body.user,
    });

    await questionData
      .save()
      .then((doc) => {
        res.status(201).send(doc);
      })
      .catch((err) => {
        res.status(400).send({
          message: "Question not added successfully",
        });
      });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default postQuestion;
