import Comments from "../../models/Comments.js";

const comment = async (req, res) => {
  try {
    await Comments.create({
      question_id: req.params.id,
      comment: req.body.comment,
      user: req.body.user,
    })
      .then((doc) => {
        res.status(201).send({
          message: "Comment added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format",
        });
      });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export default comment;
