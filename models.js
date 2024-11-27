import mongoose from "mongoose";

let models = {};

console.log("connecting to mongodb");

await mongoose.connect(
  "mongodb+srv://root:info441@cluster0.vnmb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

console.log("successfully connected to mongodb");

const businessSchema = new mongoose.Schema({
  businessName: String,
  username: String,
  employees: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  earnings: Number,
});

models.Business = mongoose.model("Business", businessSchema);

console.log("business models created");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  secondName: String,
  hoursWorked: Number,
  hourlyWage: Number,
  earnings: Number,
});

models.Employee = mongoose.model("Employee", employeeSchema);

console.log("employee models created");

const userSchema = new mongoose.Schema({
  username: String,
  favorite_bands: [String],
});

models.User = mongoose.model("User", userSchema);

console.log("user models created");

export default models;
