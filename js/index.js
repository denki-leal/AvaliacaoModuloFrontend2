"use strict";
const inputName = document.getElementById("user-create-input");
const inputPass = document.getElementById("password-create-input");
const buttonCadastro = document.getElementById("btn-criar-conta-modal");
const sessionIndex = localStorage.getItem("session");
let loggedIndex = sessionStorage.getItem("logged");
checkLoggedIndex();
function cadastrarUser() {
    if (!verificarNome(inputName.value)) {
        return alert("Seu nome precisa ter pelo menos 3 letras!");
    }
    const newUser = {
        username: inputName.value,
        password: inputPass.value,
        recados: []
    };
    const user = JSON.parse(localStorage.getItem('user')) || [];
    if (user.findIndex((user) => user.username === newUser.username) !== -1) {
        return alert(`O usuário ${newUser} não está disponivel!`);
    }
    user.push(newUser);
    localStorage.setItem('user', JSON.stringify(user));
    alert(`Tudo ok ${inputName.value}! Sua conta foi criada!`);
    limparForms();
    return;
}
function verificarNome(name) {
    if (name.length >= 3) {
        return true;
    }
    return false;
}
function saveSession(data) {
    sessionStorage.setItem('logged', data);
}
function checkLoggedIndex() {
    if (sessionIndex) {
        sessionStorage.setItem("logged", sessionIndex);
        loggedIndex = sessionIndex;
    }
    if (loggedIndex) {
        saveSession(loggedIndex);
        window.location.href = './home.html';
    }
}
const qSelect = (select) => document.querySelector(select);
function login() {
    const form = qSelect("#formulario");
    const user = JSON.parse(localStorage.getItem('user')) || [];
    const indiceUsuario = user.findIndex((us) => us.username === form.username.value);
    if (indiceUsuario === -1) {
        alert("Login ou senha invalidos");
        return;
    }
    const indicePass = user.findIndex((us) => us.password === form.password.value);
    if (indicePass === -1) {
        alert("Login ou senha invalidos");
        return;
    }
    saveSession(form.username.value);
    window.location.href = "./home.html";
}
function limparForms() {
    inputName.value = "";
    inputPass.value = "";
}
