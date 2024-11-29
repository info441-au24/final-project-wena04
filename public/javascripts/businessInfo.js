async function init() {
  loadEmployees();
  loadBusinessInfo();
}

async function loadEmployees() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const businessID = urlParams.get("businessID");

    // console.log("Extracted businessID:", businessID);

    const employees = await fetchJSON(
      `/api/employees?businessID=${businessID}`
    );
    // console.log("Employees loaded:", employees);

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
                  <td>${employee.firstName} ${employee.lastName}</td>
                  <td>${employee.hoursWorked}</td>
                  <td>$${employee.hourlyWage}</td>
                  <td>$${employee.hoursWorked * employee.hourlyWage}</td>
                </tr>
              `;
            })
            .join("\n")}
        </tbody>
      </table>
    `;

    document.getElementById("employee_info_div").innerHTML = employeesHtml;
  } catch (error) {
    console.error("Error loading employees:", error);
    document.getElementById("employee_info_div").innerHTML =
      "<p>Error loading employees.</p>";
  }
}

async function loadBusinessInfo() {
  try {
    console.log("Fetching business names...");
    const businessesJson = await fetchJSON(`/api/business/`);
    let businessesHtml = businessesJson
      .map((business) => {
        return `
        <div class="business">
          <a href="/businessInfo.html?businessID=${encodeURIComponent(
            business._id
          )}">
            <p>${business.businessName}</p>
          <a>
        </div>
      `;
      })
      .join("\n");

    document.getElementById("business_info_div").innerHTML = businessesHtml;
  } catch (error) {
    console.error("Error loading business information:", error);
    document.getElementById("business_info_div").innerHTML =
      "<p>Error loading business information.</p>";
  }
}

async function addEmployee() {
  const urlParams = new URLSearchParams(window.location.search);
  const businessID = urlParams.get("businessID");
  const firstName = document.getElementById("employee_first_name").value;
  const lastName = document.getElementById("employee_last_name").value;
  const hourlyWage = document.getElementById("hourly_wage").value;
  const hoursWorked = document.getElementById("hours_worked").value;

  console.log(
    "Testing employee info:",
    firstName,
    lastName,
    hourlyWage,
    hoursWorked,
    businessID
  );
  console.log("Testing business id:", businessID);

  let responseJson = await fetchJSON("api/employees", {
    method: "POST",
    body: {
      firstName: firstName,
      lastName: lastName,
      hourlyWage: hourlyWage,
      hoursWorked: hoursWorked,
      businessID: businessID,
    },
  });
  console.log(responseJson.status);

  if (responseJson.status == "success") {
    document.getElementById(
      "add_status"
    ).innerText = `Save Status: ${responseJson.status}`;
  } else {
    document.getElementById(
      "add_status"
    ).innerText = `Save Status: ${responseJson.status} (Error: ${responseJson.error})`;
  }
}
