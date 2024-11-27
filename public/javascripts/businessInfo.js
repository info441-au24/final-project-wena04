async function init() {
  LoadEmployees();
}

async function LoadEmployees() {
  try {
    console.log("Loading all employees...");
    const employees = await fetchJSON(`/api/employees`); // Fetch employee data
    console.log("Employees loaded:", employees); // Log the response

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

    // Update the employee_info_div with the generated HTML
    document.getElementById("employee_info_div").innerHTML = employeesHtml;
  } catch (error) {
    console.error("Error loading employees:", error);
    document.getElementById("employee_info_div").innerHTML =
      "<p>Error loading employees.</p>";
  }
}
