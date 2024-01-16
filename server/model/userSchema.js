const mongo = require("mongoose");
const profileSchema = new mongo.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "seller", "customer"],
      default: "admin",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongo.model("Profile", profileSchema);
module.exports = Profile;
