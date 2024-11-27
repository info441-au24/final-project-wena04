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

async function addEmployee() {
  const urlParams = new URLSearchParams(window.location.search);
  const businessID = urlParams.get('businessID')
  const firstName = document.getElementById("employee_first_name").value
  const lastName = document.getElementById("employee_last_name").value
  const hourlyWage = document.getElementById("hourly_wage").value
  const hoursWorked = document.getElementById("hours_worked").value

  console.log("Testing employee info:", firstName, lastName, hourlyWage, hoursWorked )
  console.log("Testing business id:", businessID)

  
  let responseJson = await fetchJSON('api/employees', {
    method: "POST",
    body: {
      firstName: firstName,
      lastName: lastName,
      hourlyWage: hourlyWage,
      // hoursWorked: hoursWorked
    }
})
  console.log(responseJson.status)

  if (responseJson.status == "success") {
    document.getElementById("add_status").innerText = `Save Status: ${responseJson.status}`;
  } else {
      document.getElementById("add_status").innerText = `Save Status: ${responseJson.status} (Error: ${responseJson.error})`;

  }

  






}
