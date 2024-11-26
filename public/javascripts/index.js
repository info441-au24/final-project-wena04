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

async function DisplayBusinesses() {
  try {
    console.log("Fetching business names...");
    const response = await fetch("/api/business/names");
    const businessNames = await response.json();

    console.log("Business names received:", businessNames);

    // Display the business names in the "business_results" div
    const resultsDiv = document.getElementById("business_results");
    resultsDiv.innerHTML = ""; // Clear any existing content

    businessNames.forEach((name) => {
      const listItem = document.createElement("p");
      listItem.textContent = name;
      resultsDiv.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching business names:", error);
  }
}
