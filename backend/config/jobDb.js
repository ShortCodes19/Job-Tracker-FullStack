import mongoose from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    const uri = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `${chalk.bgYellowBright("Data base connected - ")} ${uri.connection.host}`,
    );
  } catch (error) {
    console.log(`${chalk.red("Data base connection failed")}`);
    process.exit(1);
  }
};

export default connectDB;
