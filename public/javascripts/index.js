async function addBusiness() {
    const businessName = document.getElementById('business_name_input').value
    // console.log(businessName)

    console.log("making request to post new business name")
    let responseJson = await fetchJSON(`api/business`, {
        method: "POST",
        body: {businessName: businessName}
    })
}