import {postWithToken} from "https://jscroot.github.io/api/croot.js";
import {PostLogin,ResponseLogin} from "../config/configNPM.js";
import {URLLoginNPM} from "../template/template.js";
import {token} from '../template/template.js';

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formlogin");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let data = PostLogin();
        postWithToken(URLLoginNPM, 'Authorization', 'Bearer ' + token, data, ResponseLogin);
    });
});