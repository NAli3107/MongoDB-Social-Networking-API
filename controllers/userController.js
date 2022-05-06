const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user found with this ID! 😣 Try again." })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "No user found with this ID. 😣 Try again." });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this ID! 😣 Try again." });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};
