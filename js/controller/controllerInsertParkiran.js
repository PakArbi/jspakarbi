const getTokenFromCookies = (cookieName) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === cookieName) {
            return value;
        }
    }
    return null;
};

const showAlert = (message, type = "success") => {
    Swal.fire({
        icon: type,
        text: message,
        showConfirmButton: false,
        timer: 1500,
    });
};

const insertParkiran = async (event) => {
    event.preventDefault();

    const token = getTokenFromCookies("Login");

    if (!token) {
        showAlert("Header Login Not Found", "error");
        return;
    }

    const targetURL =
        "https://asia-southeast2-pakarbi.cloudfunctions.net/insertdataparkiran";

    const myHeaders = new Headers();
    myHeaders.append("Login", token);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: document.getElementById('newparkiranid').value,
            nama: document.getElementById('newnama').value,
            npm: document.getElementById('newnpm').value,
            prodi: document.getElementById('newprodi').value,
            namakendaraan: document.getElementById('newnamakendaraan').value,
            nomorkendaraan: document.getElementById('newnomorkendaraan').value,
            jeniskendaraan: document.getElementById('newjeniskendaraan').value,
            status: document.getElementById("newStatus").value === "active" ? true : false,
            jammasuk: document.getElementById('newjammasuk').value,
            jamkeluar: document.getElementById('newjamkeluar').value,
        }),
        redirect: "follow",
    };

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (data.status === false) {
            showAlert(data.message, "error");
        } else {
            showAlert("Parkiran data inserted successfully!", "success");
            window.location.href = "seeprofilparkiran.html";
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

document.getElementById("formparkiran").addEventListener("submit", insertParkiran);