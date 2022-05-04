const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
      }
  }
});
