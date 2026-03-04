import mongoose from "mongoose";

const regUserSchema = new mongoose.Schema({
  cwId: { type: String, required: true },
  password: { type: String, required: true },
  regNo: { type: String, required: true },
});

export default mongoose.model("RegisteredUser", regUserSchema);
