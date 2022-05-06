const req = require("express/lib/request");
const { User, Thought } = require("../models");

const userQueries = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
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
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
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
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "No user found with this ID! 😣 Try again." });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userQueries;
