const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String, 
    enum: ["user", "ai", "parent"], 
    required: true
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
   },

  text: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now 
  },

});

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [MessageSchema],
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
