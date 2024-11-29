import mongoose from "mongoose";

let models = {};

console.log("connecting to mongodb");

await mongoose.connect(
  "mongodb+srv://root:info441@cluster0.vnmb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
  // employees: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
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
});

models.Employee = mongoose.model("Employee", employeeSchema);

console.log("employee models created");

export default models;
