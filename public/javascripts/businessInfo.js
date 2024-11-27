async function init() {
  loadEmployees();
  loadBusinessInfo();
}

async function loadEmployees() {
  try {
    const employees = await fetchJSON(`/api/employees`);
    console.log("Employees loaded:", employees);

    // Generate the HTML for the table
    let employeesHtml = `
      <table border="1" class="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Hours Worked</th>
            <th>Hourly Wage</th>
            <th>Earnings</th>
          </tr>
        </thead>
        <tbody>
          ${employees
            .map((employee) => {
              return `
                <tr>
                  <td>${employee.firstName} ${employee.secondName}</td>
                  <td>${employee.hoursWorked}</td>
                  <td>$${employee.hourlyWage.toFixed(2)}</td>
                  <td>$${employee.earnings.toFixed(2)}</td>
                </tr>
              `;
            })
            .join("\n")}
        </tbody>
      </table>
    `;

    // Update the inner HTML of the employee_info_div
    document.getElementById("employee_info_div").innerHTML = employeesHtml;
  } catch (error) {
    console.error("Error loading employees:", error);
    document.getElementById("employee_info_div").innerHTML =
      "<p>Error loading employees.</p>";
  }
}
