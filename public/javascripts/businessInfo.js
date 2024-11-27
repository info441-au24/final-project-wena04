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

async function loadBusinessInfo() {
  try {
    const businessInfo = await fetchJSON(`/api/business`);
    console.log("Business information loaded:", businessInfo);

    const businessHtml = `
      <div class="business-info">
        <h2>Business Name: ${businessInfo.businessName}</h2>
        <p><strong>Owner Username:</strong> ${businessInfo.username}</p>
        <p><strong>Total Earnings:</strong> $${businessInfo.earnings.toFixed(
          2
        )}</p>
      </div>
      <div class="business-employees">
        <h3>Employees:</h3>
        ${
          businessInfo.employees && businessInfo.employees.length > 0
            ? `
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Hours Worked</th>
                    <th>Hourly Wage</th>
                    <th>Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  ${businessInfo.employees
                    .map(
                      (employee) => `
                      <tr>
                        <td>${employee.firstName}</td>
                        <td>${employee.lastName}</td>
                        <td>${employee.hoursWorked}</td>
                        <td>$${employee.hourlyWage.toFixed(2)}</td>
                        <td>$${employee.earnings.toFixed(2)}</td>
                      </tr>
                    `
                    )
                    .join("\n")}
                </tbody>
              </table>
            `
            : "<p>No employees found.</p>"
        }
      </div>
    `;

    document.getElementById("business_info_div").innerHTML = businessHtml;
  } catch (error) {
    console.error("Error loading business information:", error);
    document.getElementById("business_info_div").innerHTML =
      "<p>Error loading business information.</p>";
  }
}
