async function loadIdentity() {
    let identity_div = document.getElementById("identity_div");

    try {
        let identityInfo = await fetchJSON(`api/users/myIdentity`)
        if (identityInfo.status == "loggedin") {
            const username = identityInfo.userInfo.username;
            const name = identityInfo.userInfo.name;
            identity_div.innerHTML = `
            <p class="d-inline-block me-3">${escapeHTML(name)} (${escapeHTML(username)})</p>
            <a href="/signout" class="btn btn-danger" role="button">Log out</a>`;
        } else {
            identity_div.innerHTML = `
            <a href="/signin" class="btn btn-primary" role="button">Log in</a>`;
        }
    } catch (error) {
        console.log("Error occured when loading identity: ", error)
    }
}