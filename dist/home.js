"use strict";
let users = undefined;
let isEdit = false;
let IdEdit = undefined;
function checkLogged2() {
    if (!logged) {
        window.location.href = "./index.html";
        return;
    }
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        users = JSON.parse(dataUser);
    }
}
function logout() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}
checkLogged2();
