const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Nation = require("./nation");
const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    career: {
      type: String,
    },
    goals: {
      type: Number,
      required: true,
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
    nation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nation",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
var Players = mongoose.model("players", playerSchema);
module.exports = Players;
