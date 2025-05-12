import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

export const Account = mongoose.model('Account', accountSchema)
