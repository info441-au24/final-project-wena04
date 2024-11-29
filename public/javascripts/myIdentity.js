let myIdentity = undefined;

async function loadIdentity() {
    let identity_div = document.getElementById("identity_div");

    try {
        let identityInfo = await fetchJSON(`api/users/myIdentity`)
        if (identityInfo.status == "loggedin") {
            myIdentity = identityInfo.userInfo.username;
            identity_div.innerHTML = `
            <p class="d-inline-block me-3">${escapeHTML(identityInfo.userInfo.name)} (${escapeHTML(identityInfo.userInfo.username)})</p>
            <a href="/signout" class="btn btn-danger" role="button">Log out</a>`;
        } else {
            myIdentity = undefined;
            identity_div.innerHTML = `
            <a href="/signin" class="btn btn-primary" role="button">Log in</a>`;
        }
    } catch (error) {
        myIdentity = undefined;
    }
}