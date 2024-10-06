import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dinhhoa0701:XocODZZaSFTaJZnp@cluster0.ckkuk.mongodb.net/TestProject",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Kết nối tới database thành công");
  } catch (error) {
    console.error("Không thể kết nối tới database", error);
    process.exit(1); 
  }
};

export default connectDB;
