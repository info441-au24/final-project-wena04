async function init() {
  LoadEmployees();
}

async function LoadEmployees() {
  try {
    console.log("Loading all employees...");
    const employees = await fetchJSON(`/api/employees`);
    console.log("Employees loaded:", employees);

    // Generate HTML for employees
    let employeesHtml = employees
      .map((employee) => {
        return `
          <div class="employee">
            <p>Name: ${employee.firstName} ${employee.secondName}</p>
            <p>Hours Worked: ${employee.hoursWorked}</p>
            <p>Hourly Wage: $${employee.hourlyWage.toFixed(2)}</p>
            <p>Earnings: $${employee.earnings.toFixed(2)}</p>
          </div>
        `;
      })
      .join("\n");

    document.getElementById("employee_info_div").innerHTML = employeesHtml;
  } catch (error) {
    console.error("Error loading employees:", error);
    document.getElementById("employee_info_div").innerHTML =
      "<p>Error loading employees.</p>";
  }
}
