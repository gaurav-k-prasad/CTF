import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  role: { type: String, default: "student" },
  cwId: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
