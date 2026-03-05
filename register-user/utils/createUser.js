import bcrypt from "bcrypt";
import RegUser from "../models/reguser.model";
import User from "../models/user.model";
import connectDB from "../utils/db";

const SALT_ROUNDS = 10;

// Generate next CW ID (CW001, CW002...)
async function generateNextCWID() {
  const lastUser = await User.findOne().sort({ _id: -1 }).lean();
  let lastNumber = 0;

  if (lastUser && lastUser.cwId) {
    const match = lastUser.cwId.match(/CW(\d+)/);
    if (match) lastNumber = parseInt(match[1], 10);
  }

  const nextNumber = lastNumber + 1;
  return `CW${String(nextNumber).padStart(3, "0")}`;
}

// Generate random 9-character password with a special char
function generatePassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const specials = "!@#$%^&*";
  let pwd = "";
  for (let i = 0; i < 8; i++)
    pwd += chars[Math.floor(Math.random() * chars.length)];
  pwd += specials[Math.floor(Math.random() * specials.length)];
  return pwd
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

export async function getUserCreds(email, regno) {
  try {
    await connectDB();

    const existingUser = await RegUser.findOne({ regNo: regno });

    if (existingUser) {
      console.log(`✅ User already exists: ${regno}`);
      console.log(existingUser);
      return { ...existingUser._doc, password: "❌ Already registered" }; // Return the existing user and stop here
    }

    // 2. If no user exists, proceed with creation
    const team = null;
    const cwId = await generateNextCWID();
    const password = generatePassword();
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      username: cwId,
      email,
      password: hashed,
      team,
      role: "student",
      cwId,
    });

    const userCreds = new RegUser({ cwId, password, regNo: regno });

    await user.save();
    const savedUserCreds = await userCreds.save();
    console.log(`🧩 Created new user: ${regno} (${cwId})`);

    return { ...savedUserCreds._doc };
  } catch (err) {
    console.error("❌ Error in getUserCreds:", err);
  }
}
