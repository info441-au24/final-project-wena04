async function init() {
  loadUserinfo();
  loadBusinessInfo();
  loadEmployees();
}

async function loadBusinessInfo() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const businessID = urlParams.get("businessID");

    const business = await fetchJSON(
      `/api/businessInfo?businessID=${businessID}`
    );

    const businessesHtml = `
        <div class="business-info">
        <p>Business: ${business.businessName}</p>
        <p>Owner: ${business.username}</p>
        <p>Total Earnings: $${business.earnings || 0}</p>
        Add To Total Earnings: <input id="business_earnings_input" type="text" />
        <button onclick="addBusinessEarnings()">Add Earnings</button>
        </div>
      `;

    document.getElementById("business_info_div").innerHTML = businessesHtml;
  } catch (error) {
    console.error("Error loading business information:", error);
    document.getElementById("business_info_div").innerHTML =
      "<p>Error loading business information.</p>";
  }
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

    const employeesHtml = `
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
                  <td><button onClick="loadEmployee('${employee._id}', '${employee.firstName}', '${employee.lastName}')">${employee.firstName} ${employee.lastName}</button></td>
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
    loadEmployees();
  } else {
    document.getElementById(
      "add_status"
    ).innerText = `Save Status: ${responseJson.status} (Error: ${responseJson.error})`;
  }
}

async function loadUserinfo() {
  try {
      let user_info_div = document.getElementById("user_info_div");

      const identityInfo = await fetchJSON(`api/users/myIdentity`)
      if (identityInfo.status == "loggedin") {
          const username = identityInfo.userInfo.username;
          const name = identityInfo.userInfo.name;
          user_info_div.innerHTML = `
          <p>Name: ${escapeHTML(name)}</p>
          <p>Username: ${escapeHTML(username)}</p>
          `;
      } else {
          user_info_div.innerHTML = `<p>Please log in</p>`;
      }
  } catch(error) {
      console.log("Error occured when loading user info: " ,error);
  }
}

//onClick function to create div and input field for specific employee using the passed employee name and ID
async function loadEmployee(employeeID, firstName, lastName) {
  console.log("Entering loadEmployee function")
  // console.log(employeeID)
  // console.log(firstName)
  // console.log(lastName)

  document.getElementById("employee_edit").innerHTML = `
  <h2>Adjust ${firstName} ${lastName}'s Information</h4>
  <button onClick="addHours('${employeeID}')">Add Hours</button><input id="add_hours" type="text"/><span id="hours_update_status"></span>
  
  `

}

//New api call to employees/addHours to incrememnt and post added hours
async function addHours(employeeID) {
  const hours = document.getElementById("add_hours").value
  // console.log(hours)
  // console.log(employeeID)

  let responseJson = await fetchJSON("api/employees/addHours", {
    method: "POST",
    body: {
      hours: hours,
      employeeID: employeeID
    },
  });

  if (responseJson.status == "success") {
    document.getElementById("hours_update_status").innerText = `Update Hours: ${responseJson.status}`
  } else {
    document.getElementById("hours_update_status").innerText = `Update Hours: ${responseJson.status}`
  }
  loadEmployees()
}