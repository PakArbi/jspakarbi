import {
    deleteCookie
} from 'https://jscroot.github.io/cookie/croot.js';


function logout() {

    alert("Apakah anda yakin ingin keluar?");

    deleteCookie('Login');
    window.location.href = '/pages/login.html';
}


document.getElementById('logoutButton').addEventListener('click', logout);