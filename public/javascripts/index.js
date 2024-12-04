async function init() {
  loadIdentity();
  try {
    let identityInfo = await fetchJSON(`api/users/myIdentity`);
    if (identityInfo.status == "loggedin") {
      loadBusinesses();
    }
  } catch (error) {
    console.log("User is not logged in: ", error);
  }
}

async function addBusiness() {
  const businessName = document.getElementById("business_name_input").value;
  console.log(businessName);

  console.log("making request to post new business name");

  // fetchJSON not defined error
  // copied utils.js file to implement fetchJSON()
  let responseJson = await fetchJSON(`api/business`, {
    method: "POST",
    body: { businessName: businessName },
  });
  console.log("response received. successfully saved business");

  if (responseJson.status == "success") {
    document.getElementById(
      "postStatus"
    ).innerText = `Status: ${responseJson.status}`;
  } else {
    document.getElementById(
      "postStatus"
    ).innerText = `Status: ${responseJson.status} (${responseJson.error})`;
  }
  loadBusinesses();
}

async function loadBusinesses() {
  const capitalize = (name) =>name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  try {
    console.log("Fetching business names...");
    const businessesJson = await fetchJSON(`/api/business/`);
    let businessesHtml = businessesJson
      .map((business) => {
        return `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${capitalize(business.businessName)}</h5>
              <p class="card-text">
                <strong>Owner:</strong> ${business.username}
              </p>
              <a href="/businessInfo.html?businessID=${encodeURIComponent(
                business._id
              )}" class="btn btn-primary">Manage Business</a>
            </div>
          </div>
        </div>
      `;
      })
      .join("\n");

    document.getElementById("business_results").innerHTML = businessesHtml;
  } catch (error) {
    console.error("Error fetching business names:", error);
  }
}
