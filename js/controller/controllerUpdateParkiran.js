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

const showUpdateAlert = (message, icon = "success") => {
    Swal.fire({
        icon: icon,
        text: message,
        showConfirmButton: false,
        timer: 100000,
    }).then(() => {
        window.location.href = "seeprofilparkiran.html";
    });
};

const updateParkiran = async (event) => {
    event.preventDefault();

    const token = getTokenFromCookies("Login");

    if (!token) {
        showUpdateAlert("Anda Belum Login", "error");
        return;
    }

    const targetURL =
        "https://asia-southeast2-pakarbi.cloudfunctions.net/updatedataparkiran";

    const myHeaders = new Headers();
    myHeaders.append("Login", token);
    myHeaders.append("Content-Type", "application/json");

    const statusValue = document.getElementById("StatusInput").value === "active";

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: document.getElementById('newparkiranid').value,
            nama: document.getElementById('newnama').value,
            npm: document.getElementById('newnpm').value,
            prodi: document.getElementById('newprodi').value,
            namakendaraan: document.getElementById('newnamakendaraan').value,
            nomorkendaraan: document.getElementById('newnomorkendaraan').value,
            jeniskendaraan: document.getElementById('newjeniskendaraan').value,
            status: statusValue,
            jammasuk: document.getElementById('newjammasuk').value,
            jamkeluar: document.getElementById('newjamkeluar').value,
        }),
        redirect: "follow",
    };

    try {
        const response = await fetch(targetURL, requestOptions);
        const data = await response.json();

        if (response.ok) {
            showUpdateAlert("Berhasil Update Data", "success");
            window.location.href = "seeprofilparkiran.html";
        } else {
            showUpdateAlert(data.message || "Error updating data", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        showUpdateAlert("Error updating data", "error");
    }
};

document.getElementById("updateparkiran").addEventListener("submit", updateParkiran);

// Fetch data from the API using a GET request
const apiUrl =
    "https://asia-southeast2-pakarbi.cloudfunctions.net/getonedataparkiran";
const params = new URLSearchParams(window.location.search);
const parkiranId = params.get('_id');

// Check if the parkiranId is available
if (parkiranId) {
    const fullApiUrl = `${apiUrl}?_id=${parkiranId}`;
    console.log("Full API URL:", fullApiUrl);

    fetch(fullApiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log("API Response:", data);

            const parkiranData = data.data[0];

            document.getElementById("ParkiranIDInput").value = parkiranData.parkiranid;
            document.getElementById("NamaLengkapInput").value = parkiranData.nama;
            document.getElementById("NPMInput").value = parkiranData.npm;
            document.getElementById("ProdiInput").value = parkiranData.prodi;
            document.getElementById("NamaKendaraanInput").value = parkiranData.namakendaraan;
            document.getElementById("NomorKendaraanInput").value = parkiranData.nomorkendaraan;
            document.getElementById("JenisKendaraanInput").value = parkiranData.jeniskendaraan;
            document.getElementById("StatusInput").value = parkiranData.status;
            document.getElementById("JamMasukInput").value = parkiranData.jammasuk;
            document.getElementById("JamKeluarInput").value = parkiranData.jamkeluar;

            // Show the update form
            document.getElementById("updateparkiran").style.display = "block";
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}