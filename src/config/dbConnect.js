const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      autoIndex: true,
    });
    console.log("DB connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
