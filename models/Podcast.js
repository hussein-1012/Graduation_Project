const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true 
    },
    url: { 
        type: String,
        required: true,
        trim: true 
    },
    description: { 
        type: String, 
        trim: true },
  },
  { timestamps: true }
);

const Podcast = mongoose.model("Podcast", podcastSchema);
module.exports = Podcast;
