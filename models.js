import mongoose from "mongoose";

let models = {};

console.log("connecting to mongodb");

await mongoose.connect(
  "mongodb+srv://labradml_db_user:iWyc5BnM8zg0QNSN@cluster0.cqp624z.mongodb.net/info441"
);

console.log("successfully connected to mongodb");

const businessSchema = new mongoose.Schema({
  businessName: String,
  // employees: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  // earnings: Number,
});

models.Business = mongoose.model("Business", businessSchema);

console.log("business models created");

// const employeeSchema = new mongoose.Schema({
//   firstName: String,
//   secondName: String,
//   hoursWorked: Number,
//   hourlyWage: Number,
//   earnings: Number,
// });

// models.Employee = mongoose.model("Employee", employeeSchema);

// console.log("employee models created");

export default models;
