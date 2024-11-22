async function addBusiness() {
    const businessName = document.getElementById('business_name_input').value
    console.log(businessName)

    console.log("making request to post new business name")

    // fetchJSON not defined error
    // copied utils.js file to implement fetchJSON()
    try {
        let responseJson = await fetchJSON(`api/business`, {
            method: "POST", 
            body: {businessName: businessName}
        })
        console.log("response received. successfully saved business")
    } catch (error) {
        console.log(error)
    }

    
}