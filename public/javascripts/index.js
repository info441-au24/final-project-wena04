async function init() {
  LoadBusinesses();
}

async function addBusiness() {
  const businessName = document.getElementById("business_name_input").value;
  console.log(businessName);

  console.log("making request to post new business name");

  // fetchJSON not defined error
  // copied utils.js file to implement fetchJSON()
  try {
    let responseJson = await fetchJSON(`api/business`, {
      method: "POST",
      body: { businessName: businessName },
    });
    console.log("response received. successfully saved business");
  } catch (error) {
    document.getElementById("postStatus").innerText = "Error";
    throw error;
  }
}

async function LoadBusinesses() {
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

    document.getElementById("business_results").innerHTML = businessesHtml;
  } catch (error) {
    console.error("Error fetching business names:", error);
  }
}

async function DisplayBusinessInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const businessId = urlParams.get("businessID");

  try {
    console.log("Fetching business info...");
    const business = await fetchJSON(`/api/business/${businessId}`);

    document.getElementById("businessname-span").innerText =
      business.businessName;

    if (business.employee) {
      document.getElementById("employee_info_div").innerHTML = `
        <p>Employee: ${business.employee.firstName} ${business.employee.secondName}</p>
        <p>Hours Worked: ${business.employee.hoursWorked}</p>
        <p>Hourly Wage: ${business.employee.hourlyWage}</p>
        <p>Earnings: ${business.employee.earnings}</p>
      `;
    } else {
      document.getElementById("employee_info_div").innerText =
        "No employees for this business.";
    }
  } catch (error) {
    console.error("Error fetching business info:", error);
  }
}
