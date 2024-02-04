import {
    setCookieWithExpireHour
} from "https://jscroot.github.io/cookie/croot.js";


// Token
export function getTokenFromAPI() {
    const tokenUrl =
        "https://asia-southeast2-pakarbi.cloudfunctions.net/loginpakarbinpm";
    fetch(tokenUrl)
        .then((response) => response.json())
        .then((tokenData) => {
            if (tokenData.token) {
                userToken = tokenData.token;
                console.log("Token dari API:", userToken);
            }
        })
        .catch((error) => console.error("Gagal mengambil token:", error));
}

export function GetDataForm() {
    const usernameid = document.querySelector("#usernameid").value;
    const username = document.querySelector("#username").value;
    const npm = document.querySelector("#npm").value;
    const password = document.querySelector("#password").value;
    const passwordhash = document.querySelector("#passwordhash").value;
    const email = document.querySelector("#email").value;
    const role = document.querySelector("#role").value;

    const data = {
        usernameid: usernameid,
        username: username,
        npm: npm,
        password: password,
        passwordhash: passwordhash,
        email: email,
        role: role
    };
    return data
}

// Login
export function PostLogin() {
    const npm = document.getElementById("npm").value;
    const passwordhash = document.getElementById("passwordhash").value;
    const role = document.getElementById("role").value;

    const data = {
        npm: npm,
        passwordhash: passwordhash,
        role: role
    };
    return data;
}

// alert post 
export function AlertPost(value) {
    Swal.fire({
        icon: 'success',
        title: 'Daftar Berhasil',
        text: 'Anda telah berhasil daftar!',
    });
    window.location.href = "login.html"
}

// Response Post Login
function ResponsePostLogin(response) {
    if (response && response.token) {
        // console.log("Token User:", response.token);
        setCookieWithExpireHour("Login", response.token, 2);
        window.location.href = 'https://pakarbi.vaidiq.cloud/pages/dashboard.html';
        Swal.fire({
            icon: 'success',
            title: 'Masuk Berhasil',
            text: 'Anda telah berhasil masuk!',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Gagal Masuk',
            text: 'NPM atau Kata Sandi tidak valid. Silakan coba lagi.',
        });
    }
}

export function ResponsePost(result) {
    AlertPost(result);
}

export function ResponseLogin(result) {
    ResponsePostLogin(result);
}