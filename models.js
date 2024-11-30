import mongoose from "mongoose";

let models = {};

console.log("connecting to mongodb");

await mongoose.connect(
  "mongodb+srv://mikelabz:1234@cluster0.kxlma.mongodb.net/EMT?retryWrites=true&w=majority&appName=Cluster0"
);

console.log("successfully connected to mongodb");

const userSchema = new mongoose.Schema({
  username: String,
});

models.User = mongoose.model("User", userSchema);

console.log("user models created");

const businessSchema = new mongoose.Schema({
  businessName: String,
  username: String,

  // also don't think we need this earning field as we can calculate it
  // by doing some math on like all the employees and their hours and such
  earnings: Number,
});

models.Business = mongoose.model("Business", businessSchema);

console.log("business models created");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  hourlyWage: Number,
  hoursWorked: Number,
  businessID: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  // for the p2 functions later if we want to do them
  // date: { type: Date, default: Date.now },
});

models.Employee = mongoose.model("Employee", employeeSchema);

console.log("employee models created");

export default models;
